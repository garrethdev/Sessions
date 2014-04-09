set :output, "/log/cron.log"

every 1.day, at: "10:40 am" do
  rake "db:reset_pomodoro", :output => {:error => 'error.log', :standard => 'cron.log'}
end
