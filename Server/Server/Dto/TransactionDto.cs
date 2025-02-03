﻿namespace Server.Dto
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }  
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
    }
}
