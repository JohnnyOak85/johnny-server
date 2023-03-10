import { getDoc, wrapError } from '../../../shared';
import { RepliesDoc } from '../interfaces';
import { DB_NAME } from '../shared';

const getSpeechDoc = () => getDoc<RepliesDoc>(DB_NAME, 'speech');

export const getGreetings = async () => {
    try {
        const { greetings } = await getSpeechDoc();
        return greetings;
    } catch (error) {
        throw wrapError(error, 'getGreetings');
    }
};

export const getPredictions = async () => {
    try {
        const { predictions } = await getSpeechDoc();
        return predictions;
    } catch (error) {
        throw wrapError(error, 'getPredictions');
    }
};

export const getReactions = async () => {
    try {
        const { reactions } = await getSpeechDoc();
        return reactions;
    } catch (error) {
        throw wrapError(error, 'getReactions');
    }
};

export const getResponses = async () => {
    try {
        const { responses } = await getSpeechDoc();
        return responses;
    } catch (error) {
        throw wrapError(error, 'getResponses');
    }
};
