import { GameEngine } from "../../main-engine";
import { MockEventEngine } from "./mock-event-engine";

/**
 * Mock GameEngine for presentations that uses the MockEventEngine
 * for controlled, predictable event sequences while using all other real engines.
 */
export class MockGameEngine extends GameEngine {
    constructor() {
        // Pass the MockEventEngine to the parent constructor
        // All other engines will use their default implementations
        super(
            new MockEventEngine() as any, // Cast to any to match EventEngine type
            undefined, // jobEngine - use default
            undefined, // satisfactionEngine - use default
            undefined, // investmentEngine - use default
            undefined, // homeEngine - use default
            undefined, // creditEngine - use default
            undefined  // recommendationEngine - use default
        );
    }
}
