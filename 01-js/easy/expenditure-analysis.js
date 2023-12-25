/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  if (transactions.length <= 0) return [];
  let total_transactions = [
    {
      category: transactions[0].category,
      totalSpent: transactions[0].price,
    },
  ];

  for (let i = 1; i < transactions.length; i++) {
    let flag = 1;
    for (let j = 0; j < total_transactions.length; j++) {
      if (total_transactions[j].category === transactions[i].category) {
        total_transactions[j].totalSpent += transactions[i].price;
        flag = 0;
      }
    }
    if (flag) {
      total_transactions.push({
        category: transactions[i].category,
        totalSpent: transactions[i].price,
      });
    }
  }
  return total_transactions;
}

module.exports = calculateTotalSpentByCategory;
