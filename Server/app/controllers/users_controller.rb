class UsersController < ApplicationController

  def register
    # look up a duplicate user
    user = User.find_by(name: params[:name])
    if user
      # raise an error if its a duplicate
      render json: { errors: ["Name is taken"] }.to_json
    else
      # Try and create a user
      user = User.create(name: params[:name], password: params[:password])
      if user.save
        # Login and return if they're valid
        LoginController.login(session, user)
        render json: user.public_attributes.to_json
      else
        # Show an error if they're invalid
        render json: { errors: user.errors.full_messages }.to_json
      end
    end          
  end

  def login
    # look up the user
    user = User.find_by(params[:name])
    if user
      if user.authenticate(params[:password])
        # login and return the user if they've authenticated
        LoginController.login(session, user)
        render json: user.public_attributes.to_json
      else
        # show an error if the password is invalid
        render json: { errors: ["Incorrect password"] }.to_json
      end
    else
      # show an error if the user wasn't found
      render json: { errors: ["User not found with that username"] }.to_json
    end
  end

  def logout
    # Try and log out a user
    user = LoginController.logout(session)
    if user
      # Return the user if they were logged out
      render json: user.to_json
    else
      # Show an error if nobody was logged in to start with
      render { errors: ["nobody was logged in"] }.to_json
    end
  end
  
end
