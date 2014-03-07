class UsersController < ApplicationController
  def create
      # @user = User.new(username: params[:user][:username], password: params[:user][:password])
      @user = User.new(params[:user])
      @user.password = params[:password]
      if @user.save!
        redirect_to :back
      end
  end

  def login
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      give_token
    else
      redirect_to home_url
    end
  end

end
