namespace Server.Dto
{
    public class UpdateTransactionDto
    {
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
    }
}
