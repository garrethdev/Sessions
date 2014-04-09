namespace :db do
  desc "reset Pomodoro count to zero"
  task :reset_pomodoro => :environment do
    User.update_all(pomodoro:0)
  end
end