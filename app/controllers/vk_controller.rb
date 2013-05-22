class VkController < ApplicationController
  def handle
    resp={}
    if params[:notification_type] == "get_item" or "get_item_test"
      resp={:response => {:order_id => Time.now.to_i}}
    elsif params[:notification_type] == "order_status_change" or params[:notification_type] == "order_status_change_test"
      if params[:status]!="chargeable"
        resp={:error => {:error_code => 102, :error_msg => "chargeable?", :critical => true}}
      else
        resp={:response => {:order_id => Time.now.to_i}}
      end
    else
      resp={:error => {:error_code => 101, :error_msg => "strange error", :critical => true}}
    end
    render :json => resp.to_json
  end

end
