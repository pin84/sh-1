# 4-10
有加班的管理制度 ，之后加班是需要申请

但是公司对我们的信任，但是大家也需要自律点，

# 4-6
PY文件修改了
ride-pricing-get接口能不能把距离也返回来

# 4-1 
- 团队卡片 拆分到个人。如果需要多个共同完成，就按那两个人需要不需要拆分成几张卡片。也可次拆。（下周会议应该怎么做）
- 推新接口，一定要做价格的比较测试

# 3-29
- 技术分享的我修改了一下，主要是怎么实现今年的三倍利润的，原先hehao是说最小的工作，最大的收获，我修改成了根据前面提到的四点和smart pricing 我们将会抢到更多的订单，实现这个目标
- BUG卡片如果不知道是那个团队的，就给Gang和Mayak
- 我们这个月的KPI，将会是最后一名，有可能需要乐捐50USD。主要是跟运营的业绩挂钩的太多了，会有修改（或者修改成运营完成目标的多少百分比，就算我们完成了目标）

# 3-26
- hehao的表权限开通了
- 超公里按每公里收费的功能怎么样了，
- 面试如果超过4小时，需要开个卡，

- 携程的车型映射为什么不能同时映射两辆车

# top

debugger ride-quotes 接口
aws 如何看当前使用的方法（要录屏）
车队login接口报错，如何debugger
代理商的价格是怎么算的。（是在我们官网的基础上打9拆？我们官网是在mozio的基础上加35%？现在mozio的加价是0%。我们还会加价吗）
合作伙伴的加价，整个合作伙伴的加价就是加上。但是服务区的加价没有加上

KPI详情

需要的表：
elife_app
fleet_supply_demand
agency
corporate


成本价设置之后，如查要调一条路线所有的车都加10%。我们怎么调？


好的，ping，我东京这边有这个地址，是东京涩谷酒店的，可是bonging每次下单过来系统就定位到大阪，这个问题您能帮忙核查更改一下吗，我都有三四个这样的单了
2669438
2715844
2700353
（需要跟Gang沟通，发邮件给booking.修正地址和坐标对应不上的问题）

Ride 2844462  这个实际服务区域是台北，现在进来还是显示无锡
2818034

BO显示是UTP。但客人说他在BKK
2930014

doNotDel: "doNotDel" （去掉）


43的版本我们会加上这两个功能
停用服务区。(把半径修改成1，然后把服务区的中心点移动超过3KM)
删除所有机场（Elife的服务区不能最后一个机场不能删除。下个月做）
删除机场，需要先查一下看有没有订单，如果有订单，则不能删除。而且最后一个机场需要用SQL用删除，之前的都是用API

bigquery查询，改进。（显示地址。增加查询的日期，并找到地址完全匹配的数据放到前面）（最好能加一下下载成excle 表格功能。推后）
世界地图 先看技术上行不行。如果可以，到时候我们和他们聊一聊，看怎么合作，费用上前期能不能免去或者其它优惠

43版本切换地图，here.com or openstreetmap，之后把服务区和一口价全部用多边形，多边形的字段尽量短，
地图可以同时调用两个地图，可以对比（）

pricing weekly
json， 我们传给后台的内容并不大，300KB这样，Charles说主要是后台计算的时候慢，（测试具体时间）

运营

价格顺序
不符合一口价的条件下，优先级：市区距离（需起始点都在范围内）> 圈内点对点一口价（需起始点都在范围内）>服务区距离

一口价
- 起点是机场，到另一个一口价的圈内。用终点的圈的价格
V42 的数据不能和v41共用，在42加了p2p_t，d_amt，p_amt三个新的字段（接送机不同价格）


待验证
市区价的坐标判断有点问题，等下版本发布后修复
Claire SGN不显示

跨国
{
    "cross_countries": [
        ["USA", "CAN"],
        ["CHN", "HKG", "MAC"],
        ["SGP", "MYS"],
        ["AUT", "BEL", "HRV", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "NLD", "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE"]
    ]
}

# 1-22
BUG,进度回复


# 1-19
47版本的patch.
云南四个机场数据修改，现在可以返回价格
苏黎世 机场价格核实，现在 sedan是我们的车，其他的车价格都不是最好的，让运营调一下再看。

# 1-17
partner name ='elifetransfer'
拿到fleetID

夜间费加不了，运营应该怎么办。？


# 1-14
vehicle-pricing 页面价格变动过大的提示做得明显点
B2B查询底价的工具，尽量简单，并且不做重复的工作

# 1-8
booking那边的等级。找谁知道？
提交BUG的时候，最好自己去测试过。我们现的KPI都是连在一起的，
技术分享

脚本修改了乘车时间。需要把额外的收费也加进去，这个需要和booking联系？
3127634 客人下单是minibus-8的车，但是收到提12座的车

需要把booking不展示的做成标准化，让运营自己来弄
mozio那边也有回复了，说是我们的API慢，导致的不显示，他们加长了时间


# 1-2
报价的方式
能调用到对手的价格吗


# 12-28
fujiang和joy都需要会整理数据，发送给合作伙伴。

# 12-20
跟运营的周会要全程记录，
fujinag跟后台提的需要修改，希望把我们开发都带上，至少带上我。要不然很多功能不同步，之后我们还需要再去了解。

# 12-4
表的权限
supply_demand_pricing
lat_lng_4_dist_time
lat_lng_4_dist_time_est
47版本的功能感觉并不通用
邮件了两个机场给Gang.booking低价不显示的
给fujiang开BO的账号

停用服务区




# 11-29
半自动化踩点，
vce 移除阻栏

# 11-20
学习踩点，然后在APP里做。（jason）
here 能不能显示路标、酒店、景区。中文字体
调整圈的大小比较麻烦，一是第二点，二是现在边框比较窄，可以放宽点，并做手势的切换
抽时间了解百度地图


# 11-13
1) TAG 机场的坐标修改  Panglao Island, Philippines 
2) sam 那边NAV和TXZ机场问题的跟进
3）PUJ机场，我们给的价格是7.98.但在那边显示15.太高了
4）DND 机场删除的问题


学习踩点，然后在APP里做。（jason）

# 10-28
1) 如果跨国了，怎么办？如果乘客办好了签证，我们可以送吗？
2）时区已经可以存在json中，尽量用44的版本保存一次


# 10-24
@Ozgur Akdogan 
Dear team, 
When we download a CSV file from service area app (v43) if there is a comma sign it is considered as another location and the locations get mixed and prices are moving to the next slot. Would there be a solution to remove comma signs directly from the service area app? 

Istanbul Airport Tayakadın 坐标修正

# 10-23
周全：
1）和Gang的沟通，
2）chole需要的新功能。
  需求：
  1.后台是否可以增加针对价格圈的特殊日期加减价（不同价格圈可能加减价的比例不一样，取舍差别较大）
  2.后台是否可以增加针对价格圈的急单加价设置（不同价格圈可能急单加价的比例不一样，取舍差别很大）
3）wilson说都是按照18%来算的。佣金是按运营在pricing里面的设置算的吗
4）here地图的KEY。
5）我们的URL是不是也需要修改成pricing app
6) json里会记录服务区所在的时区，

胡宗白
苏梅国际机场 ---Lub d Koh Samui Chaweng Beach - SHA Extra Plus （后台在查）

# 11-2
1) 从匈牙利到罗马尼亚，为什么其他公司可以显示价格，

# 10-22
11409司机删除悉尼的服务区
44版本的BUG修改
和运营的周会



# 10-21
修改44版本一些BUG，
Supplier 那边的一些问题。


# 10-20
和后一起修改了LYU机场的信息，
计算价格是把时区等信息存到json里，后台会使用这些信息，以更准确地计算价格
修改了一些BUG，


# 10-18
整理了两个地址的数据给Gang.都是booking不显示的我们的车的，
修改_path的路径，使所有文件都放到版本号的文件件夹下

# 10-17
43版本做个patch.当没有加价时，做了条件判断
整理minibus-7 以及 hourly ride在mozio上不显示的数据，给了dalia

# 10-16
2599 全作伙伴添加服务区的问题排查
我Joy对了bigquery接口的功能，我们现在没有办法准确定位到请求数据，需要wilson那边协助。

# 10-13 周会
地图切换了，现在中国和日本是google.其他国家是here.看运营的反馈，如果他们不想用here,我们可以给他们切到google吗？
Minibus-7(8) 在西班牙能用吗(回复 Maria Alba Amador Ramirez)
按时间包车的订单，在mozio上不显示，已经跟他们联系了吗，有什么进度
合作伙伴的车型能不能显示在页面中
我们是否可以在页面中完成合并服务区的操作？
价格计算，取高不是低，运营意见不一致，大多人想取高的。

Seville Airport A-4, Km. 532, 41020 Sevilla, Spain
Seville, Spain


# 10-12
Naha Okinawa Airport (OKA), 150 Kagamizu, Naha, Okinawa 901-0142, Japan
Hotel Collective, 2-chōme-5-7 Matsuo, Naha, Okinawa 900-0014, Japan

OKA -->

沖縄ヤマト運輸 泊センター 2-chōme-24-9 Nishi, Naha, Okinawa 900-0036, Japan
BiBi Hotel 国際通り店 3-chōme-20-36 Makishi, Naha, Okinawa 900-0013, Japan
コンドミニアム沖縄 株式会社, 日本、〒900-0032 沖縄県那覇市松山１丁目８−１５ 四季ビル 6階


# 10-11
Archer Hotel Napa 1230 1st St, Napa, CA 94559, USA
SFO 
Sacramento,CA,USA

jenny 新版本的设置


# 9-20
Special Date 页面功能修改，可以选择同一天，并且结束时间不能早于开始的时间


# 9-11
测试json的长度，准备做长度限制。

# 9-11
joy add-zones  pour()  
# 9-9
检查42版本的代码，
高德世界地图

# 9-8
2803126 合作伙伴传过来的地址和坐标是对的，我们BO里显示是另外的地址

服务区Ho Chi Minh,Vietnam，
Tan Son Nhat International Airport (SGN), Trường Sơn, Phường 2, Tân Bình, Thành phố Hồ Chí Minh, Vietnam
RIVERGATE SERVICED APARTMENTS, 151, 155 Đ. Bến Vân Đồn, Phường 6, Quận 4, Thành phố Hồ Chí Minh 700000, Vietnam

不显示我们的车，


# 9-6
Archer Hotel Napa 1230 1st St, Napa, CA 94559, USA
SFO 
Sacramento,CA,USA

jenny 新版本的设置


# 9-5
合并419->38

# 9-2
新建一个仓库和JS同级
新功能的发布，不能及时传达给每个运力。（周会只是主要的几个人来了，也有可能没有入时传递给其他人）

坐标对应不上，以及泰国的几个地址没有价格及时反馈给booking
服务器被人攻击的问题我们需要注意那些方面吗？我已经跟开发说注意杀下毒。原因找到了吗？
后台的一口价计算的逻辑太复杂且没有规律了。比如 from / to都是机场，当两个点都画有圈时，用的是 to 的圈的 和 from相同的机场的价格，完全不考虑 from圈的价格。
当 to 没有圈时，又用上了from这个圈的 和 to  相同的机场的价格
允许进单的最小时间，因为有时差，所以会不准，但是不是天天变，需要自己注意并换算一下。（运力自己算时区误差）
合作伙伴修改的历史记录（暂时保留，先不修改。）


# 9-1
pricing weekly

Everett,USA
Seattle,USA

# 8-30
42版本代码的review.
服务器上的代码检查，我们被人攻击了。不知道是谁的电脑上中毒了。特别是开发的，也注意一下自己的电脑。因为我们是会上传代码到服务器的，
和伙伴们对了一下43版本的内容

# 8-29
42版本代码的review,跟后台对了计算价格接口的逻辑

# 8-28
42版本代码的review,跟后台对了计算价格接口的逻辑
跟Vincent 说一下here.com的地图，他们需要用了ride.html上。

# 8-26
最小进单时间功能的讨论。

# 8-25
了解openstreetmap 
review code, 43版本的逻辑

# 8-24
了解openstreetmap 
优化代码，下个版本把我们项目从原来的文件中拆分出来，到时我们会新建一个仓库。


# 8-23
pricing app  周会，
了解 openstreetmap
准备 运营可以自己收集Booking不从我们这里请求API的证据，做为表格 这个功能

# 8-22
运营的周会，关于包车的价格

# 8-19
关于包车价格的讨论，
sam给的ADB机场价格最好但是在booking上不显示。

# 8-16

EZE机场好边是因为当地的司机没有把驾照和其他信息发给Booking,所以不显示我们的车，其他地区不懂是不是也是这样。

# 8-15 
和Gang的周会，以及和运营的周会。
和运营的周会是，fujiang总是抢话，并把思路带到别的地方去，让我有点困扰

群里的用语尽量大众化一些。运营她们可能
监控费用能做到谁用的更多，这样也可以知道那个地区经常发现问题。
review ward 代码
41版本上线前的一些测试，

# 8-10
here.com地图多边形。

# 8-9 
多段路程计价的规则，和Charles了解。每停一次车，收起步价的1/4

# 8-8 
Jazmin's issued in EZE 
@Samira Marouf: business sedan is close but still recieving ride

# 8-7
42版本的需求确定

# 8-4
41版本可以公告了吗？

# 8-3
地址：巴黎北站-Residence Inn by Marriott Paris Didot Montparnasse
issue: 我们计算距离的接口返回18.7KM。用坐标在map.google上算，得8.6km.会造成我们跟合作伙伴之部的价格有所差别


Suvarnabhumi Airport 999, Tambon Nong Prue, Amphoe Bang Phli, Chang Wat Samut Prakan 10540, Thailand

The Grand Palace Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand


# 8-2
即将上线的功能的检查，包括Ward写的删除车辆后，同步删除每个partner下的服务区内的车辆的价格




# 8-1
跟后台要了booking 和飞猪的车辆对应关系，
新加的车 能用的平台以及 对应关系
Comfort Sedan(12)
Business MPV-4(13)
Luxury Sedan(14)
MPV-6(7)  , Minibus-7(8)

# 7-31

  pricing weekly(jenny,Jason,Sicinius,Wilson)
  资深后端的面试
  合作伙伴按车型加价的修改，逻辑有点问题
  圈内点对点订单价格确认（未完成）
  ward 和 joy 代码review
# 7-29

 用车的时间和距离限制  和 服务区合并的事情 Joe 讨论
 测试多边形计价以合作伙伴按车辆加价的功能，多边形有点问题
 infant/children/toddler 需要增加三个婴儿坐
 和Joe讨论Jazmin Magnin的需求。以及合并服务区的事

# 7-28

添加 ENO（恩卡纳西翁 - 巴拉圭）机场
yanping_wu 看生产环境的价格
删除所有机场以及停用服务区的需求确定

# 7-25

2703652 and 2702188 有 barriers 但还是有价格.
mpv-6 and minibus 7 以及新加的三个车的价格API切换，
一口价内点对点，切换后。 jenny测试
新加的三个车，需要找Vivi和William 加mapping关系。

# 7-24

Whoos, only score and etc and only applies to these service area
   40, New York
      37, Los angeles
      38, San Francisco, USA
      55, Vancouver,Canada
      62, Las Vegas,USA
      68, Chicago,USA
      69, Miami,USA

It has no effect on other service areas, but right now it is in

### elife_service_area_id, name, count(*)

37, Los Angeles,USA, 20
38, San Francisco, USA, 17
39, Seattle,USA, 2
40, New York,USA, 58
55, Vancouver,Canada, 26
56, Toronto,Canada, 5
57, Montreal,Canada, 5
58, Calgary,Canada, 3
59, Ottawa Canada, 2
62, Las Vegas,USA, 15
68, Chicago,USA, 10
69, Miami,USA, 24
71, Fort Myers FL USA, 1
72, Orlando,USA, 7
88, Atlanta,GA,USA, 3
92, Buffalo,USA, 1
94, Nashville,USA, 1
97, Jacksonville, 1
98, Austin,USA, 1
99, Houston,USA, 1
100, Quebec,Canada, 1
185, London,UK, 24
430, Lisbon,Portugal, 1
650, Winnipeg Canada, 1
799, Sarasota/Bradenton  FL  USA, 1
1284, Victoria Canada, 1

# 7-18

linkCircleRadiusField

# 7-17

加上车型。july一个小时后调用报价的API，lanye去生产环境看一下
fujiang装备好图片之类的。让lanye加到数据库
ping 在长沙把新车用上。
july检查 飞猪那边其他车型的报价是不是正常的
tony下单。
订单给Rio，

William 车型兼容
rik 中文网车型名字 现在是hardcode

再去公布.告诉其他同事，明天会增加新车，我们以DEV上已经测试过了。

Hi,team.我们将在中国时间7/18上午10：00（7 PM 7/17 US SFO time）在我们的系统中新增三辆车。分别是:

- Comfort Sedan (12)
- Business MPV-4 (13)
- Luxury Sedan (14)

我们已经在开发环境中进行了测试，一切正常。 然而，我们在生产中要保持谨慎。

我们将用长沙服务区来测试。请不要在其他服务区选择这三辆车。即使看到了，也不要使用。测试过程可能需要几个小时。
什么时候可以使用这三辆车，我们会另外通知。
感谢！

Hi team, we will start the process of adding three new cars to our system at 10:00 AM in China time on 7/18 (7 PM 7/17 US SFO time). They are:

- Comfort Sedan (12)
- Business MPV-4 (13)
- Luxury Sedan (14)

We have tested in dev environment and everything is fine. However we want to be cautious in production.

We will use the Changsha service area to test. Please do not select these three cars in other service areas. Even if you see them, do not use them. The process will take several hours. We will notify you separately when you can use these three cars.
Thank you!

# 7-13

新增车型 12，13，14

1. vehicle_class 里加信息,name_i18n_id 对应 i18n 表里的id
2. i18n表里加入中文名，英文名或其他国家的名字
3. vehicle_category_class 表里添加home page的排序，class_id 对应 vehicle_class表里的id
4. select * from
fleet_to_ride_vehicle_mapping
where
from_vehicle_id in (12,13,14,2,40,4) order by from_vehicle_id;
需要在fleet_to_ride_vehicle_mapping 中所车辆的对应关系加进去

# 7-14

138967

新需求：计算价格时显示使用那个服务区的价格来计算

# 7-7

- 地址是属于那个服务区
-

错误的账号密码 提示需要登录 进去后才会显示

在长沙公司上班的期间，给Jason的团队做两场培训，第一天的效果我感觉很好。大家都很积极，提出了很多意见。第二场培训是今天下午做的，主要是pricing app 的使用。这一次主要对一些新同事
不过他们可能对这个系统不是特别感觉兴趣或者是真的不知道是做什么，没有概念，所以收到的效果不是很好。
我们组内的同事，感觉挺好的。还算融洽。
我也跟Jason,  Wilson, Sicinius,Holy,jenny 碰头，也算相互认识。很多人，之前是在视频里见过，现在都能对得上号了~
这次来长沙呢 ，有很大的收获 ，同时也感觉到，远程办公确实会跟同事会产生陌生感，:-)

另外，还有其他的安排吗？如果没有，我就订明天的机票回柳州了。

需要一个功能，可以使服务不能接到订单

# 7-6

<https://k3zdvi12m6.execute-api.us-east-2.amazonaws.com/prod/ride-pricings?ses=SlXAB7woZ6xAVBpDNoknkueoMlpAmmRI24Isl5UjAvsdwdV9wKJzcKyqwpTHmzwfapkd8PUqsdHApELClSxhJggBYDakItsnxmtpIldJtcRffO88up5vK6Nabkp37z2F&demand_fleet_id=15&from_lat=45.487976&from_lng=12.599716&to_lat=45.5048661&to_lng=12.3494716&time=1688661600&vehicle_class_id=1&passenger_count=3>

1. yanping_wu 关于生产环境新增数据的模板？
2. 全合伙伴的调用
3. prod 39版本的review
4. 车辆名称统一。Business MPV-5 - Business SUV   (4)

合作伙伴调用 review

1. 拿到原始的调用参数。key，ses之类的不要显示
2. 跟Charles学习调拦截

# 6-13

- 计算的接口报错了之后 需要把loading的图标去掉

# 6-19

每个页面都在pour之前验证数据的正确性，然后计算和保存之前也要验证一下，不正确就 不能进行

# 6-21

vehicle pricing修改成和前面一样的价格时不会立即生效，并且切换页面再回来，价格会变成没有修改之前

## 6-28

多边形的半径最好小一点，我50KM就差不多了

# 2023-6-28

翻译功能失效了。需要检查（joy）
38版本日历被档住了

137720

# 2023-6-29

137851
137852
137865
137878

# 2023-6-30

找几个合作伙伴先测试一下

# 7-4

接机成本比较贵。司机需要在机场等1个小时。（由于航班的时间不定或是客人出站的速度。所以要求司机会提前一个小时到机场）

如果能做到接机或送机不一样的价格会更好

test svc
email: <test-svc@elifeteam.com>
password: svc123

employee_id: 277
person_id: 2783546

先参考报表，如果订单少了，就去踩点，各个区域如果点多，需要花很一天以上的时间
先找一下地址，热评或是五星酒店。
先参考价格，

红色三角不要显示历史，只要本次修改的显示就好了。
红色字休也同样。不用初始价格做为参考，要就上一次的价格。

vihicle pricing 的页面太大了，希望可以加过滤的功能（车和圈）

计算的时间比较长，他们会随便输一个地址，再去保存，他们不太想用这个功能（）

计算器没有价格的不显示

希望能按一口价的圈子单独加价。

按时间加价，可以选择一天的时间。

车型对应对需要整理一份出来，把API的映射表列出来。

服务不删除只做暂停。

# 7-5

加新车前写一个卡给Gang.一步一步写清楚在数据库里修改什么东西。 yanping
backlog
google看板的数据，是否可以所一些经常需要查询的服务区排在前面。这样应该可以节省查询量。现在查的是某个partner下某个服务区的记录

加车型

- 上传车辆图片到S3
- vihicle_class 加入新车
- i18n分类
- servie area 排序
- home page 排序
- vehicle_category_class
- name_i18n_id

## 待办

- 合作伙伴请求，主要了解google 看板。
