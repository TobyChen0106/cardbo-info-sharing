export const emptyOffer = {
    offerID: undefined,
    offerName: undefined,
    bankName: undefined,
    cardInfo:
        [{
            cardID: undefined,
            cardName: undefined
        }],
    expiration: {
        beginDate: undefined,
        endDate: undefined,
    },
    offerAbstract: undefined,
    category: undefined,
    tags: [undefined],
    numSearch: undefined,
    reward: {
        contents: undefined,
        limits: undefined,
        timingToOffer: undefined,
        places: undefined,
        notes: {
            values: undefined,
            sentences: undefined,
            time: undefined
        }
    },
    constraint: {
        userIdentity: undefined,
        timingOfConsumption: undefined,
        channels: undefined,
        amounts: undefined,
        numberOfConsumption: undefined,
        type: undefined,
        others: undefined
    },
    link: undefined,
}

export const emptyOfferList = {
    offerID: undefined,
    offerName: undefined,
    bankName: undefined,
    cardInfo_cardID: undefined,
    cardInfo_cardName: undefined,
    expiration_beginDate: undefined,
    expiration_endDate: undefined,
    offerAbstract: undefined,
    category: undefined,
    tags: [undefined],
    numSearch: undefined,
    reward_contents: undefined,
    reward_limits: undefined,
    reward_timingToOffer: undefined,
    reward_places: undefined,
    reward_notes_value: undefined,
    reward_notes_sentences: undefined,
    reward_notes_time: undefined,
    constraint_userIdentity: undefined,
    constraint_timingOfConsumption: undefined,
    constraint_channels: undefined,
    constraint_amounts: undefined,
    constraint_numberOfConsumption: undefined,
    constraint_type: undefined,
    constraint_others: undefined,
    link: undefined,
}

export const offerList2Offer = (offerList) => {
    return ({
        offerID: offerList.offerID,
        offerName: offerList.offerName,
        bankName: offerList.bankName,
        cardInfo:
            [{
                cardID: offerList.cardInfo_cardID,
                cardName: offerList.cardInfo_cardName
            }],
        expiration: {
            beginDate: offerList.expiration_beginDate,
            endDate: offerList.expiration_endDate,
        },
        offerAbstract: offerList.offerAbstract,
        category: offerList.category,
        tags: offerList.tags,
        numSearch: offerList.numSearch,
        reward: {
            contents: offerList.reward_contents,
            limits: offerList.reward_limits,
            timingToOffer: offerList.reward_timingToOffer,
            places: offerList.reward_places,
            notes: {
                values: offerList.reward_notes_values,
                sentences: offerList.reward_notes_sentences,
                time: offerList.reward_notes_time
            }
        },
        constraint: {
            userIdentity: offerList.constraint_userIdentity,
            timingOfConsumption: offerList.constraint_timingOfConsumption,
            channels: offerList.constraint_channels,
            amounts: offerList.constraint_amounts,
            numberOfConsumption: offerList.constraint_numberOfConsumption,
            type: offerList.constraint_type,
            others: offerList.constraint_others
        },
        link: offerList.link,
    })
}

export const offer2OfferList = (offer) => {
    return ({
        offerID: offer.offerID,
        offerName: offer.offerName,
        bankName: offer.bankName,
        cardInfo_cardID: offer.cardInfo.cardID,
        cardInfo_cardName: offer.cardInfo.cardName,
        expiration_beginDate: offer.expiration.beginDate,
        expiration_beginDate: offer.expiration.endDate,
        offerAbstract: offer.offerAbstract,
        category: offer.category,
        tags: offer.tags,
        numSearch: offer.numSearch,
        reward_contents: offer.reward.contents,
        reward_limits: offer.reward.limits,
        reward_timingToOffer: offer.reward.timingToOffer,
        reward_places:  offer.reward.places,
        reward_notes_value: offer.reward.notes.value,
        reward_notes_sentences: offer.reward.notes.sentences,
        reward_notes_time: offer.reward.notes.time,
        constraint_userIdentity: offer.constraint.userIdentity,
        constraint_timingOfConsumption: offer.constraint.timingOfConsumption,
        constraint_channels: offer.constraint.channels,
        constraint_amounts: offer.constraint.amounts,
        constraint_numberOfConsumption: offer.constraint.numberOfConsumption,
        constraint_type: offer.constraint.type,
        constraint_others:offer.constraint.others,
        link: offer.link,
    })
}