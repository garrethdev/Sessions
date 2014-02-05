require 'test_helper'

class NameControllerTest < ActionController::TestCase
  test "should get hojme" do
    get :hojme
    assert_response :success
  end

end
