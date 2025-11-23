import { EventModel } from "../../models/event-model";
import { EventImpactModel } from "../../models/event-impact-model";
import { StateModel } from "../../models/state-model";
import { GoalModel } from "../../models/goal-model";

export class MockEventEngine {
    private callCount: number = 0;

    public async randomlyGenerateEvent(
        probability: number,
        history: StateModel[],
        goal: GoalModel,
        eventHistory: EventModel[]
    ): Promise<EventModel | undefined> {
        this.callCount++;

        // First call: no event
        if (this.callCount === 1) {
            return undefined;
        }

        // Second call: job promotion
        if (this.callCount === 2) {
            const newSalary = 75000;

            const promotionEvent: EventModel = {
                impact: {
                    changeInOccupancyModel: {
                        occupationTitle: "Mid-level Software Engineer",
                        occupationDescription: "You've been promoted to a mid-level position with increased responsibilities.",
                        yearlySalaryInEuro: newSalary,
                        stressLevelFrom0To100: 45
                    },
                    newPortfolioModel: null,
                    changeInLivingModel: null,
                    changeInSavingsRateInPercent: null,
                    changeInAmountOfChildren: null,
                    newEducationLevel: null,
                    changeInLifeSatisfactionFrom1To100: 10,
                    newMarried: null
                },
                alternativeImpact: {
                    changeInOccupancyModel: null,
                    newPortfolioModel: null,
                    changeInLivingModel: null,
                    changeInSavingsRateInPercent: null,
                    changeInAmountOfChildren: null,
                    newEducationLevel: null,
                    changeInLifeSatisfactionFrom1To100: 5,
                    newMarried: null
                },
                eventDescription: "Great news! You've been promoted to Mid-level Software Engineer!",
                eventQuestion: "Do you accept the promotion with increased responsibilities and stress, or decline and maintain work-life balance?",
                emoji: "🎉",
                year: history[history.length - 1].year
            };
            return promotionEvent;
        }

        // Third and fourth call: no events
        if (this.callCount === 3) {
            return undefined;
        }

        // Fifth call: finding a girlfriend
        if (this.callCount === 4) {
            const girlfriendEvent: EventModel = {
                impact: {
                    changeInOccupancyModel: null,
                    newPortfolioModel: null,
                    changeInLivingModel: null,
                    changeInSavingsRateInPercent: -3, // Dating expenses
                    changeInAmountOfChildren: null,
                    newEducationLevel: null,
                    changeInLifeSatisfactionFrom1To100: 15,
                    newMarried: null
                },
                alternativeImpact: {
                    changeInOccupancyModel: null,
                    newPortfolioModel: null,
                    changeInLivingModel: null,
                    changeInSavingsRateInPercent: null,
                    changeInAmountOfChildren: null,
                    newEducationLevel: null,
                    changeInLifeSatisfactionFrom1To100: -5,
                    newMarried: null
                },
                eventDescription: "You've met someone special!",
                eventQuestion: "Do you want to commit to this relationship and invest time (and money) into it, or focus on your career and savings goals?",
                emoji: "💕",
                year: history[history.length - 1].year
            };
            return girlfriendEvent;
        }

        // Sixth call: crypto boom
        if (this.callCount === 5) {
            const currentState = history[history.length - 1];
            const currentCrypto = currentState.portfolio.cryptoInEuro;
            
            const cryptoBoomEvent: EventModel = {
                impact: {
                    changeInOccupancyModel: null,
                    newPortfolioModel: {
                        cryptoInEuro: currentCrypto * 2,
                    },
                    changeInLivingModel: null,
                    changeInSavingsRateInPercent: null,
                    changeInAmountOfChildren: null,
                    newEducationLevel: null,
                    changeInLifeSatisfactionFrom1To100: 25,
                    newMarried: null
                },
                alternativeImpact: null,
                eventDescription: "The crypto market has a boom! Your crypto investments have doubled in value!",
                eventQuestion: null,
                emoji: "🚀",
                year: history[history.length - 1].year
            };
            return cryptoBoomEvent;
        }

        // All subsequent calls: no events
        return undefined;
    }
}
