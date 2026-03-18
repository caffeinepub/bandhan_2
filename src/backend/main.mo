import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  // Initialize authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Integrate blob storage
  include MixinStorage();

  public type Gender = { #male; #female; #other };
  public type Religion = { #hindu; #muslim; #christian; #sikh; #other };
  public type Caste = { #general; #obc; #sc; #st; #other };
  public type Education = { #highSchool; #bachelor; #master; #phd; #other };
  public type Profession = {
    #doctor;
    #engineer;
    #teacher;
    #software;
    #business;
    #government;
    #artist;
    #other;
  };

  public type Profile = {
    name : Text;
    age : Nat;
    gender : Gender;
    religion : Religion;
    caste : Caste;
    motherTongue : Text;
    education : Education;
    profession : Profession;
    city : Text;
    state : Text;
    aboutMe : Text;
    photoUrl : ?Text;
    isProfileComplete : Bool;
  };

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      Text.compare(profile1.name, profile2.name);
    };
  };

  public type ProfileFilter = {
    minAge : ?Nat;
    maxAge : ?Nat;
    religion : ?Religion;
    city : ?Text;
  };

  let profiles = Map.empty<Principal, Profile>();

  public shared ({ caller }) func createOrUpdateProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create or update profiles");
    };

    profiles.add(caller, profile);
  };

  public query ({ caller }) func getOwnProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    profiles.get(caller);
  };

  public query ({ caller }) func getProfile(user : Principal) : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    profiles.get(user);
  };

  public query ({ caller }) func browseProfiles(filter : ?ProfileFilter) : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can browse profiles");
    };

    let iter = profiles.values();
    let array = iter.toArray().sort();

    switch (filter) {
      case (null) { array };
      case (?f) {
        array.filter(
          func(p) {
            (switch (f.minAge) {
              case (null) { true };
              case (?minAge) { p.age >= minAge };
            }) and
            (switch (f.maxAge) {
              case (null) { true };
              case (?maxAge) { p.age <= maxAge };
            }) and
            (switch (f.religion) {
              case (null) { true };
              case (?religion) { p.religion == religion };
            }) and
            (switch (f.city) {
              case (null) { true };
              case (?city) { p.city == city };
            });
          }
        );
      };
    };
  };

  public query ({ caller }) func isProfileComplete() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check profile completeness");
    };

    switch (profiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.isProfileComplete };
    };
  };

  public shared ({ caller }) func uploadPhoto(fileName : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload photos");
    };

    let fileUrl = "bandhan/" # fileName;

    switch (profiles.get(caller)) {
      case (null) {};
      case (?profile) {
        let updatedProfile = { profile with photoUrl = ?fileUrl };
        profiles.add(caller, updatedProfile);
      };
    };

    fileUrl;
  };
};
