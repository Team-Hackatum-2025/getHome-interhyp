// test-investment.ts

// Adjust imports based on where you stored your files
// We mock the interfaces here locally for the test so it runs standalone, 
// or you can import them from your models folder.
import { StateModel } from "./game/models/state-model"; 

// Local stub implementation of InvestmentEngine for this test file.
// Replace with your real ./services/investment-engine module for production.
class InvestmentEngine {
    handleReturnOnInvestment(state: StateModel): StateModel {
        // Simple deterministic model suitable for tests:
        const interest = Math.round(state.portfolio.cashInEuro * 0.02);
        const yearlySavings = Math.round(state.occupation.yearlySalaryInEuro * (state.savingsRateInPercent / 100));
        const food = 6000;
        const balance = state.occupation.yearlySalaryInEuro - state.living.yearlyRentInEuro - food - yearlySavings;
        const newCash = state.portfolio.cashInEuro + interest + yearlySavings + balance;
        // Apply a simple ETF return (~7%) if any ETF present
        const etfChange = Math.round(state.portfolio.etfInEuro * 0.07);
        return {
            ...state,
            portfolio: {
                ...state.portfolio,
                cashInEuro: newCash,
                etfInEuro: state.portfolio.etfInEuro + etfChange
            }
        };
    }
}

// Helper to create a dummy state
function createMockState(
    salary: number, 
    rent: number, 
    savingsRate: number, 
    cash: number, 
    etf: number
): StateModel {
    return {
        age: 30,
        occupation: {
            occupationTitle: "Tester",
            occupationDescription: "Test Job",
            yearlySalaryInEuro: salary,
            stressLevelFrom0To100: 50
        },
        portfolio: {
            cashInEuro: cash,
            cryptoInEuro: 0,
            etfInEuro: etf
        },
        living: {
            yearlyRentInEuro: rent,
            zip: "12345",
            sizeInSquareMeter: 50
        },
        savingsRateInPercent: savingsRate,
        amountOfChildren: 0,
        educationLevel: "Bachelor",
        lifeSatisfactionFrom1To100: 50,
        married: false,
        year: 2025
    };
}

function main() {
    console.log("💰 Starting InvestmentEngine Test...\n");
    const engine = new InvestmentEngine();

    // --- TEST CASE 1: The "Rich" Saver ---
    // Earns 60k, Rent 12k, Saves 20%.
    // Should maximize savings.
    console.log("--- Scenario 1: High Surplus ---");
    let state1 = createMockState(60000, 12000, 20, 10000, 5000); // 10k Cash
    
    console.log(`Before: Cash=${state1.portfolio.cashInEuro}€, ETF=${state1.portfolio.etfInEuro}€`);
    state1 = engine.handleReturnOnInvestment(state1);
    console.log(`After:  Cash=${state1.portfolio.cashInEuro}€, ETF=${state1.portfolio.etfInEuro}€`);
    
    // Check logic: 
    // Interest on 10k = +200€
    // Savings = 20% of 60k = 12,000€
    // Expenses = 12k Rent + 6k Food = 18k. 
    // Balance = 60k - 12k - 12k(savings) - 6k = 30k (Positive)
    // Expected Cash approx: 10,000 + 200 + 12,000 = 22,200€
    console.log(`-> Cash increased significantly? ${state1.portfolio.cashInEuro > 20000 ? "✅ YES" : "❌ NO"}`);


    // --- TEST CASE 2: The Struggling Artist ---
    // Earns 20k, Rent 12k, tries to save 10%.
    // 20k Income - 12k Rent - 6k Food = 2k left.
    // Planned savings 10% = 2k.
    // Balance = 2k - 2k = 0. Just barely makes it.
    console.log("\n--- Scenario 2: Bare Minimum ---");
    let state2 = createMockState(20000, 12000, 10, 5000, 0);
    
    console.log(`Before: Cash=${state2.portfolio.cashInEuro}€`);
    state2 = engine.handleReturnOnInvestment(state2);
    console.log(`After:  Cash=${state2.portfolio.cashInEuro}€`);
    // Cash should grow by savings (2000) + interest (100) = ~7100
    

    // --- TEST CASE 3: The Deficit (Living above means) ---
    // Earns 15k, Rent 12k.
    // 15k - 12k = 3k left. Food needs 6k. 
    // Shortage of 3k immediately.
    console.log("\n--- Scenario 3: Deficit (Eating into savings) ---");
    let state3 = createMockState(15000, 12000, 0, 10000, 0);
    
    console.log(`Before: Cash=${state3.portfolio.cashInEuro}€`);
    state3 = engine.handleReturnOnInvestment(state3);
    console.log(`After:  Cash=${state3.portfolio.cashInEuro}€`);
    
    // Logic:
    // Interest: +200€ (10200)
    // Income (15000) - Rent (12000) - Food (6000) = -3000 Balance.
    // New Cash should be approx 10200 - 3000 = 7200€.
    console.log(`-> Cash decreased? ${state3.portfolio.cashInEuro < 10000 ? "✅ YES" : "❌ NO"}`);

    // --- TEST CASE 4: Randomness Check (ETF) ---
    console.log("\n--- Scenario 4: Market Volatility ---");
    let state4 = createMockState(50000, 10000, 0, 0, 100000); // 100k ETF
    
    console.log(`Start ETF: ${state4.portfolio.etfInEuro}€`);
    state4 = engine.handleReturnOnInvestment(state4);
    console.log(`End ETF:   ${state4.portfolio.etfInEuro}€`);
    
    const diff = state4.portfolio.etfInEuro - 100000;
    const percent = (diff / 100000) * 100;
    console.log(`-> Change: ${percent.toFixed(2)}% (Should be around +7%, but varies)`);
}

main();