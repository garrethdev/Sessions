class NamesController < ApplicationController
  def index
    @user = User.new
  end
end
