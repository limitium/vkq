require 'spec_helper'

describe QueensController do

  describe "GET 'all'" do
    it "should be successful" do
      get 'list', :viewer_id => 14647796
      response.should be_success
    end
  end

   describe "GET 'limitium'" do
    it "should be successful" do
      get 'show', :id=>14647796, :viewer_id => 14647796
      response.should be_success
    end
  end

end