
# ViewModel---------------------------------------------------------------
ShowReportsViewModel = ->
  self = @
  self.reports = ko.observableArray([])
  self.reportNum = ko.observable(0)
  self.pageNumArray = ko.computed(->
    pageNum = Math.ceil(self.reportNum() / NUMOFPAGE)
    pageNum = 1 if pageNum == 0
    [1..pageNum])

  self.currentPage = ko.observable(1)

  self

# 初始化 ---------------------------------------------------------------

# 每页显示的日报条数
NUMOFPAGE = 4

getReports = (userId=null)->
  data = {page:1, numOfPage:NUMOFPAGE, userId:userId}
  Model.getReports(data, (response)->
    return if response.state == 0
    reportvm.reports(response.data))

getReportNum = (userId=null)->
  Model.getReportNum(userId, (response)->
    return if response.state == 0
    reportvm.reportNum(response.data))

reportvm = new ShowReportsViewModel()
ko.applyBindings(reportvm)

window.getReports = getReports
window.getReportNum = getReportNum
window.reportvm = reportvm

#翻页组件---------------------------------------
$("div.pagination").on("click", "li a", ->
  page = $(this).text()
  page = parseInt(page)
  gotoPage(page)
  false)

window.gotoPage = (page)->
  reportvm.currentPage(page)
  data = {page:page, numOfPage:NUMOFPAGE}
  Model.getReports(data, (response)->
    return if response.state == 0
    reportvm.reports(response.data))