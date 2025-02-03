﻿namespace Server.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public TransactionType Type { get; set; }

        public User User { get; set; }
        public Category Category { get; set; }

        public enum TransactionType
        {
            Expense,
            Income
        }
    }
}
