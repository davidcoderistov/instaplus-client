import { FindMessagesByChatIdQueryType } from '../../../graphql/types/queries/chat'
import { Message } from '../../../graphql/types/models'
import { v4 as uuidv4 } from 'uuid'


interface AddMessageOptions {
    queryData: FindMessagesByChatIdQueryType
    variables: {
        message: Message
    }
}

interface AddMessageReturnValue {
    queryResult: FindMessagesByChatIdQueryType
}

export function addMessage(options: AddMessageOptions): AddMessageReturnValue {
    return {
        queryResult: {
            findMessagesByChatId: {
                ...options.queryData.findMessagesByChatId,
                data: [options.variables.message, ...options.queryData.findMessagesByChatId.data],
            },
        },
    }
}

interface UpdateMessageOptions {
    queryData: FindMessagesByChatIdQueryType
    variables: {
        id: string,
        message: Message
    }
}

interface UpdateMessageReturnValue {
    queryResult: FindMessagesByChatIdQueryType
}

export function updateMessage(options: UpdateMessageOptions): UpdateMessageReturnValue {
    return {
        queryResult: {
            findMessagesByChatId: {
                ...options.queryData.findMessagesByChatId,
                data: options.queryData.findMessagesByChatId.data.map(message => {
                    if (message._id === options.variables.id) {
                        return options.variables.message
                    }
                    return message
                }),
            },
        },
    }
}

interface ReactToMessageOptions {
    queryData: FindMessagesByChatIdQueryType
    variables: {
        messageId: string,
        reaction: string,
        creator: {
            _id: string
            firstName: string
            lastName: string
            username: string
            photoUrl: string | null
        }
    }
}

interface ReactToMessageReturnValue {
    queryResult: FindMessagesByChatIdQueryType
}

export function reactToMessage(options: ReactToMessageOptions): ReactToMessageReturnValue {
    return {
        queryResult: {
            findMessagesByChatId: {
                ...options.queryData.findMessagesByChatId,
                data: options.queryData.findMessagesByChatId.data.map(message => {
                    if (message._id === options.variables.messageId) {
                        const reactions = Array.isArray(message.reactions) ? message.reactions : []
                        let reactionFound = false
                        const newReactions = reactions.map(reaction => {
                            if (reaction.creator._id === options.variables.creator._id) {
                                reactionFound = true
                                return {
                                    ...reaction,
                                    reaction: options.variables.reaction,
                                }
                            }
                            return reaction
                        })
                        return {
                            ...message,
                            reactions: reactionFound ? newReactions : [...reactions, {
                                _id: uuidv4(),
                                reaction: options.variables.reaction,
                                creator: options.variables.creator,
                            }],
                        }
                    }
                    return message
                }),
            },
        },
    }
}

const mutations = {
    addMessage,
    updateMessage,
    reactToMessage,
}

export default mutations