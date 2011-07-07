require 'test_helper'

class AchivesControllerTest < ActionController::TestCase
  setup do
    @achive = achives(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:achives)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create achive" do
    assert_difference('Achive.count') do
      post :create, :achive => @achive.attributes
    end

    assert_redirected_to achive_path(assigns(:achive))
  end

  test "should show achive" do
    get :show, :id => @achive.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @achive.to_param
    assert_response :success
  end

  test "should update achive" do
    put :update, :id => @achive.to_param, :achive => @achive.attributes
    assert_redirected_to achive_path(assigns(:achive))
  end

  test "should destroy achive" do
    assert_difference('Achive.count', -1) do
      delete :destroy, :id => @achive.to_param
    end

    assert_redirected_to achives_path
  end
end
