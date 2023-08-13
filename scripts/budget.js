document.getElementById('calculate').addEventListener('click', function() {
    const income = parseFloat(document.getElementById('income').value);
    
    // Get the selected CSV file
    const expensesFileInput = document.getElementById('expenses-file');
    const expensesFile = expensesFileInput.files[0];
    
    if (expensesFile) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const expensesData = event.target.result;
        
        // Parse the CSV data
        const expensesArray = expensesData.split('\n');
        const expensesByCategory = {}; // To store expenses by category
        
        expensesArray.forEach(function(expenseLine) {
          const expenseParts = expenseLine.split(',');
          if (expenseParts.length === 2) {
            const expenseCategory = expenseParts[0];
            const expenseValue = parseFloat(expenseParts[1]);
            if (!isNaN(expenseValue) && expenseValue !== 0) {
              if (!expensesByCategory[expenseCategory]) {
                expensesByCategory[expenseCategory] = 0;
              }
              expensesByCategory[expenseCategory] += expenseValue;
            }
          }
        });
        
        // Display the expenses by category
        const expensesList = Object.keys(expensesByCategory).map(category => `${category}: $${expensesByCategory[category].toFixed(2)}`).join('<br>');
        document.getElementById('expenses-list').innerHTML = expensesList;
        
        // Calculate total expenses
        const totalExpenses = Object.values(expensesByCategory).reduce((total, expense) => total + expense, 0);
        
        // Display total expenses
        document.getElementById('total-expenses').textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
        
        // Calculate remaining balance
        const remainingBalance = income - totalExpenses;
        document.getElementById('balance').textContent = remainingBalance.toFixed(2);
      };
      
      reader.readAsText(expensesFile);
    }
  });
  