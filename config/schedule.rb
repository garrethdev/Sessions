set :output, "/log/cron.log"

every 1.day, at: "10:35 pm" do
  rake "db:reset_pomodoro", :output => {:error => 'error.log', :standard => 'cron.log'}
end
