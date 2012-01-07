module ApplicationHelper
  def page_data(objs, index)
    data = ""
#    if index + 1 == objs.length
#      data = "last_page=#{objs.current_page}"
#      if objs.current_page.last?
#        data += " end_of_list=true"
#      end
#    end
    data
  end
end