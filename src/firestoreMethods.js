import { collection, addDoc ,query,where , getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth"

//fetch the client data of the current user
export const fetchClient = async()=>{
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log(currentUser);
   

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch client data from Firestore
        const userCollectionRef = collection(db, "clients");
        const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
        const clientDocs = await getDocs(clientDocRef);

        if (clientDocs.empty) {
            alert("Client data not found in Firestore. Please contact support.");
            return;
        }

        const clientData = clientDocs.docs[0].data(); // Data for the current user
        console.log(clientData);
        return clientData;
    }catch(e){
        console.error("Error");
        console.log(e);
    }
}

//for fetching all loans by the current user (not account but the uid)
export const fetchLoansByUID = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        alert("No user is currently logged in. Please log in to continue.");
        return [];
    }

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch loans data from Firestore
        const loansCollectionRef = collection(db, "loans");
        const loansQuery = query(loansCollectionRef, where("uid", "==", uid));
        const loansDocs = await getDocs(loansQuery);

        if (loansDocs.empty) {
            console.log("No loans found for the current user.");
            return [];
        }

        // Step 2: Map through documents and extract data
        const loansData = loansDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(loansData); // Logs all matching loan documents
        return loansData;
    } catch (e) {
        console.error("Error fetching loans data: ", e);
        return [];
    }
};


//for feftching all transactions by the current user (not account but the uid)
export const fetchtransactionsByUID = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        alert("No user is currently logged in. Please log in to continue.");
        return [];
    }

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch transactions data from Firestore
        const transactionsCollectionRef = collection(db, "transactions");
        const transactionsQuery = query(transactionsCollectionRef, where("uid", "==", uid));
        const transactionsDocs = await getDocs(transactionsQuery);

        if (transactionsDocs.empty) {
            console.log("No transactions found for the current user.");
            return [];
        }

        // Step 2: Map through documents and extract data
        const transactionsData = transactionsDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(transactionsData); // Logs all matching loan documents
        return transactionsData;
    } catch (e) {
        console.error("Error fetching transactions data: ", e);
        return [];
    }
};


//for fetching all the loans based on the given branch id 
export const fetchLoansByBranch = async (branchId) => {
    try {
        // Step 1: Fetch loans data from Firestore
        const loansCollectionRef = collection(db, "loans");
        const loansQuery = query(loansCollectionRef, where("branch", "==", branchId));
        const loansDocs = await getDocs(loansQuery);

        if (loansDocs.empty) {
            console.log(`No loans found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const loansData = loansDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(loansData); // Logs all matching loan documents
        return loansData;
    } catch (e) {
        console.error("Error fetching loans data by branch: ", e);
        return [];
    }
};


//for fetching all the loans based on the branch id of the current user
export const fetchLoansByCurrentUserBranch = async () => {
    try {
        // Step 1: Get the current user's UID
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error("No authenticated user found.");
            return [];
        }

        const uid = currentUser.uid; // User's unique identifier from Firebase Auth

        // Step 2: Fetch the user's document from Firestore to get their branchId
        const userCollectionRef = collection(db, "clients");
        const userQuery = query(userCollectionRef, where("uid", "==", uid));
        const userDocs = await getDocs(userQuery);

        if (userDocs.empty) {
            console.error("Client data not found for the current user.");
            return [];
        }

        const userData = userDocs.docs[0].data(); // Assuming one document per user
        const branchId = userData.branchId;

        if (!branchId) {
            console.error("Branch ID is missing in the client's document.");
            return [];
        }

        // Step 3: Fetch all loans associated with the user's branchId
        const loansCollectionRef = collection(db, "loans");
        const loansQuery = query(loansCollectionRef, where("branch", "==", branchId));
        const loansDocs = await getDocs(loansQuery);

        if (loansDocs.empty) {
            console.log(`No loans found for branch: ${branchId}`);
            return [];
        }

        // Step 4: Map through loans and extract data
        const loansData = loansDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(loansData); // Logs all matching loan documents
        return loansData;

    } catch (error) {
        console.error("Error fetching loans by current user's branch:", error);
        return [];
    }
};


//for fetching all the transactions based on the given branch id
export const fetchtransactionsByBranch = async (branchId) => {
    try {
        // Step 1: Fetch transactions data from Firestore
        const transactionsCollectionRef = collection(db, "transactions");
        const transactionsQuery = query(transactionsCollectionRef, where("branch", "==", branchId));
        const transactionsDocs = await getDocs(transactionsQuery);

        if (transactionsDocs.empty) {
            console.log(`No transactions found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const transactionsData = transactionsDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(transactionsData); // Logs all matching transaction documents
        return transactionsData;
    } catch (e) {
        console.error("Error fetching transactions data by branch: ", e);
        return [];
    }
};


//for fetching all the transactions based on the branch id of the current user
export const fetchtransactionsByCurrentUserBranch = async () => {
    try {
        // Step 1: Get the current user's UID
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error("No authenticated user found.");
            return [];
        }

        const uid = currentUser.uid; // User's unique identifier from Firebase Auth

        // Step 2: Fetch the user's document from Firestore to get their branchId
        const userCollectionRef = collection(db, "clients");
        const userQuery = query(userCollectionRef, where("uid", "==", uid));
        const userDocs = await getDocs(userQuery);

        if (userDocs.empty) {
            console.error("Client data not found for the current user.");
            return [];
        }

        const userData = userDocs.docs[0].data(); // Assuming one document per user
        const branchId = userData.branchId;

        if (!branchId) {
            console.error("Branch ID is missing in the client's document.");
            return [];
        }

        // Step 3: Fetch all transactions associated with the user's branchId
        const transactionsCollectionRef = collection(db, "transactions");
        const transactionsQuery = query(transactionsCollectionRef, where("branch", "==", branchId));
        const transactionsDocs = await getDocs(transactionsQuery);

        if (transactionsDocs.empty) {
            console.log(`No transactions found for branch: ${branchId}`);
            return [];
        }

        // Step 4: Map through transactions and extract data
        const transactionsData = transactionsDocs.docs.map(doc => ({
            id: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(transactionsData); // Logs all matching transaction documents
        return transactionsData;

    } catch (error) {
        console.error("Error fetching transactions by current user's branch:", error);
        return [];
    }
};


//for fetching all the loans based on the given account id
export const fetchLoansByAccountId = async (accountId) => {
    try {
        // Reference to the loans collection
        const loansCollectionRef = collection(db, "loans");

        // Query to find loans where the accountId matches the provided account ID
        const loansQuery = query(loansCollectionRef, where("accountId", "==", accountId));

        // Execute the query
        const loansSnapshot = await getDocs(loansQuery);

        // Extract the data from the documents
        const loansData = loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (loansData.length === 0) {
            console.log("No loans found for the given account ID.");
            return [];
        }

        console.log("Loans for the given account ID:", loansData);
        return loansData;

    } catch (error) {
        console.error("Error fetching loans for account ID:", error);
        throw new Error("Failed to fetch loans. Please try again.");
    }
};


//for fetching all the transactions based on the given account id
export const fetchtransactionsByAccountId = async (accountId) => {
    try {
        // Reference to the transactions collection
        const transactionsCollectionRef = collection(db, "transactions");

        // Query to find transactions where the accountId matches the provided account ID
        const transactionsQuery = query(transactionsCollectionRef, where("accountId", "==", accountId));

        // Execute the query
        const transactionsSnapshot = await getDocs(transactionsQuery);

        // Extract the data from the documents
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (transactionsData.length === 0) {
            console.log("No transactions found for the given account ID.");
            return [];
        }

        console.log("transactions for the given account ID:", transactionsData);
        return transactionsData;

    } catch (error) {
        console.error("Error fetching transactions for account ID:", error);
        throw new Error("Failed to fetch transactions. Please try again.");
    }
};


//for updating the balance amount when some amount is deposited
export const depositMoneyToAccount = async (accountId, depositAmount) => {
    try {
        // Reference to the account document
        const accountDocRef = doc(db, "accounts", accountId);

        // Fetch the current account data
        const accountSnapshot = await getDoc(accountDocRef);

        if (!accountSnapshot.exists()) {
            console.error("Account not found");
            throw new Error("Account not found. Please provide a valid account ID.");
        }

        const accountData = accountSnapshot.data();

        // Calculate the new balance
        const newBalance = accountData.balance + depositAmount;

        // Update the account's balance in Firestore
        await updateDoc(accountDocRef, { balance: newBalance });

        console.log(`Successfully deposited ${depositAmount} to account ${accountId}. New balance: ${newBalance}`);

        // Log the deposit as a transaction
        const transactionData = {
            accountId,
            amount: depositAmount,
            branch: accountData.branch,
            uid: accountData.uid, 
            date: getCurrentDate(),
            description: "Deposit",
            recipient: "self",
            status: "Completed",
            type: "Credit",
        };

        const transactionsCollectionRef = collection(db, "transactions");
        const transactionDocRef = await addDoc(transactionsCollectionRef, transactionData);

        console.log("Transaction logged successfully with ID:", transactionDocRef.id);

        return {
            success: true,
            message: `Deposit successful. New balance: ${newBalance}`,
            transactionId: transactionDocRef.id,
        };

    } catch (error) {
        console.error("Error depositing money:", error);
        throw new Error("Failed to deposit money. Please try again.");
    }
};


//for updating the balance amount when some amount is withdrawn
export const withdrawMoneyFromAccount = async (accountId, withdrawalAmount) => {
    try {
        // Reference to the account document
        const accountDocRef = doc(db, "accounts", accountId);

        // Fetch the current account data
        const accountSnapshot = await getDoc(accountDocRef);

        if (!accountSnapshot.exists()) {
            console.error("Account not found");
            throw new Error("Account not found. Please provide a valid account ID.");
        }

        const accountData = accountSnapshot.data();

        // Check if withdrawal is possible
        if (withdrawalAmount > accountData.balance) {
            console.error("Insufficient balance for withdrawal.");
            throw new Error("Insufficient balance. Please enter a valid amount.");
        }

        // Calculate the new balance
        const newBalance = accountData.balance - withdrawalAmount;

        // Update the account's balance in Firestore
        await updateDoc(accountDocRef, { balance: newBalance });

        console.log(`Successfully withdrew ${withdrawalAmount} from account ${accountId}. New balance: ${newBalance}`);

        // Log the withdrawal as a transaction
        const transactionData = {
            accountId,
            amount: withdrawalAmount,
            branch: accountData.branch,
            uid: accountData.uid, // Assuming the account has a uid field for the user
            date: getCurrentDate(),
            description: "Withdrawal",
            recipient: "self",
            status: "Completed",
            type: "Debit",
        };

        const transactionsCollectionRef = collection(db, "transactions");
        const transactionDocRef = await addDoc(transactionsCollectionRef, transactionData);

        console.log("Transaction logged successfully with ID:", transactionDocRef.id);

        return {
            success: true,
            message: `Withdrawal successful. New balance: ${newBalance}`,
            transactionId: transactionDocRef.id,
        };

    } catch (error) {
        console.error("Error withdrawing money:", error);
        throw new Error("Failed to withdraw money. Please try again.");
    }
};
