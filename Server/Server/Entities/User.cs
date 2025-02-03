using System.ComponentModel.DataAnnotations;

namespace Server.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
    }
}
