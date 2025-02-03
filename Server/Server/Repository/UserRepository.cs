using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Entities;

namespace Server.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AuthContext context;

        public UserRepository(AuthContext context)
        {
            this.context = context;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await this.context.Users.ToListAsync();
        }


        public async Task<bool> AddUser(User user)
        {
            await this.context.Users.AddAsync(user);
            return await this.context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await this.context.Users
                .Where(u => u.Email == email)
                .SingleOrDefaultAsync();
        }
    }
}
