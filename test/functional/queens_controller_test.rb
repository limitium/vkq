require 'test_helper'

class QueensControllerTest < ActionController::TestCase
  setup do
    @queen = queens(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:queens)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create queen" do
    assert_difference('Queen.count') do
      post :create, :queen => @queen.attributes
    end

    assert_redirected_to queen_path(assigns(:queen))
  end

  test "should show queen" do
    get :show, :id => @queen.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @queen.to_param
    assert_response :success
  end

  test "should update queen" do
    put :update, :id => @queen.to_param, :queen => @queen.attributes
    assert_redirected_to queen_path(assigns(:queen))
  end

  test "should destroy queen" do
    assert_difference('Queen.count', -1) do
      delete :destroy, :id => @queen.to_param
    end

    assert_redirected_to queens_path
  end
end
