import { FollowableUser } from '../../models'


export interface FollowUserMutationType {
    followUser: FollowableUser
}

export interface UnfollowUserMutationType {
    unfollowUser: FollowableUser
}