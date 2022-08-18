from github import Github
import schedule
import time

# First create a Github instance:

# using an access token
g = Github(login_or_token="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")
#g = Github(login_or_token="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", timeout=3, retry=2)
#g = Github(login_or_token="ImaniAN", password="PurposePa$$w0rd960311", timeout=20)

# Search For users
for users in g.search_users(query="location:durban, type:user", sort="followers",):
        g.get_user().add_to_following(following=users)
        print("You are now following", users.name)

#followers:>1,
#fullname:imani, niyigena
#sort="followers", joined, 
#order="desc"
#location:"South Africa",durban,rwanda,
# # code goes here
