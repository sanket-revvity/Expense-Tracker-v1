using Server.Entities;

namespace Server.Helper
{
    public interface IJwtHelper
    {
        string GenerateJwtToken(User user);

    }
}
