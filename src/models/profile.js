export default class Profile {
  constructor({
    id,
    nickname,
    profileImage,
    profileDescription,
    reviewScore,
    twitterAccoun,
    instagramAccount,
    facebookAccount,
  }) {
    this.id = id;
    this.nickname = nickname;
    this.profileImage = profileImage;
    this.profileDescription = profileDescription;
    this.reviewScore = reviewScore;
    this.twitterAccoun = twitterAccoun;
    this.instagramAccount = instagramAccount;
    this.facebookAccount = facebookAccount;
  }
}
