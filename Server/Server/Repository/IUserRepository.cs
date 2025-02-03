using Server.Entities;

namespace Server.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);

        Task<bool> AddUser(User user);

        Task<List<User>> GetAllUsers();
    }
}
