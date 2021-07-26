import { makeAutoObservable } from "mobx";

export class SubscriptionService {
    subscribers;

    constructor() {
        makeAutoObservable(this)
        this.subscribers = []
    }

    getSingleSubscriber(subscriberId) {
        const subscriberIndex = this.subscribers.findIndex(sub => sub.id === subscriberId)
        return this.subscribers[subscriberIndex]
    }

    setSubscribers(sub) {
        this.subscribers = [...sub]
    }
}

const subscriptionService = new SubscriptionService()

export default subscriptionService