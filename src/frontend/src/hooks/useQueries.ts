import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Profile, ProfileFilter } from "../backend.d";
import { useActor } from "./useActor";

export function useOwnProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile | null>({
    queryKey: ["ownProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOwnProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsProfileComplete() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isProfileComplete"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isProfileComplete();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBrowseProfiles(filter: ProfileFilter | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Profile[]>({
    queryKey: ["browseProfiles", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseProfiles(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error("Not connected");
      await actor.createOrUpdateProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownProfile"] });
      queryClient.invalidateQueries({ queryKey: ["isProfileComplete"] });
    },
  });
}

export function useUploadPhoto() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      fileName,
      file,
    }: { fileName: string; file: File }) => {
      if (!actor) throw new Error("Not connected");
      const uploadUrl = await actor.uploadPhoto(fileName);
      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      return uploadUrl.split("?")[0];
    },
  });
}
