# Not a true controller. Provides class methods.
# The session is passed as a parameter

# Used as a helper by other controllers

class LoginController < ApplicationController
  
  SessionUserIdentifier = "current_user_id"  

  def self.login(session, user)
    user.login
    session[SessionUserIdentifier] = user.session_token
  end

  def self.logout(session)
    id = session[SessionUserIdentifier]
    session.delete(SessionUserIdentifier)
    user = User.find_by(id: id)
    user&.logout      
    user
  end
 
end
