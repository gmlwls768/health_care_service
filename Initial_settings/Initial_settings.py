import pymssql
import csv

import os
from dotenv import load_dotenv
store_link = [
    {"category":"단백질",
     "name":"옵티멈 골드 스탠다드 웨이",
     "link":"https://www.coupang.com/vp/products/6424463926?itemId=13837679944&vendorItemId=3180840444&src=1139000&spec=10799999&addtag=400&ctag=6424463926&lptag=AF7910856&itime=20231219015928&pageType=PRODUCT&pageValue=6424463926&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219015928&redirect=landing&traceid=V0-181-0204c0f24c9440c6&mcid=fd776aa7321e400da9c21bdfe50e0b83&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
    {"category":"단백질",
     "name":"컴뱃 100%",
     "link":"https://www.coupang.com/vp/products/6731349444?itemId=3071491018&vendorItemId=4041827021&src=1139000&spec=10799999&addtag=400&ctag=6731349444&lptag=AF7910856&itime=20231219020010&pageType=PRODUCT&pageValue=6731349444&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020010&redirect=landing&traceid=V0-181-c7a4d267bbb9b282&mcid=bb1db91387bb40969e8d46c8ffc23873&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
    {"category":"탄수화물",
     "name":"청년곡물 귀리가루",
     "link":"https://www.coupang.com/vp/products/171730878?vendorItemId=4242511760&src=1139000&spec=10799999&addtag=400&ctag=171730878&lptag=AF7910856&itime=20231219020115&pageType=PRODUCT&pageValue=171730878&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020115&redirect=landing&traceid=V0-181-d9af9bf788a73fe3&mcid=a0a18ae015d6482fa922f5a8aa226273&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
    {"category":"탄수화물",
     "name":"인스턴트 오트",
     "link":"https://www.myprotein.co.kr/sports-nutrition/100-instant-oats/10529296.html?affil=awin&utm_content=https%3A%2F%2Fblog.naver.com%2Fhyun_do&utm_term=Direct+Traffic&utm_source=AWin-504921&utm_medium=affiliate&utm_campaign=AffiliateWin&sv1=affiliate&sv_campaign_id=504921&awc=10751_1702918909_1fc3600b1910bdf541e38fe60da4a8ef"
     },
    {"category":"비타민",
     "name":"투퍼데이 캡슐",
     "link":"https://kr.iherb.com/pr/life-extension-two-per-day-multivitamin-60-capsules/86456"
     },
    {"category":"비타민",
     "name":"얼라이브",
     "link":"https://www.coupang.com/vp/products/1152619585?itemId=2127383548&vendorItemId=70125946615&src=1139000&spec=10799999&addtag=400&ctag=1152619585&lptag=AF7910856&itime=20231219020310&pageType=PRODUCT&pageValue=1152619585&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020310&redirect=landing&traceid=V0-181-b565f5bf26622b78&mcid=ac60764ed8cd4ce1a9e7755d39e24082&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
    {"category":"유산균",
     "name":"캘리포니아 골드 50억",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-lactobif-5-probiotics-5-billion-cfu-60-veggie-capsules/64006"
     },
    {"category":"유산균",
     "name":"자로우 50억",
     "link":"https://kr.iherb.com/pr/jarrow-formulas-jarro-dophilus-eps-10-billion-120-veggie-caps-5-billion-per-capsule/7006"
     },
     {"category":"카페인",
     "name":"GAT 카페인",
     "link":"https://kr.iherb.com/pr/jarrow-formulas-jarro-dophilus-eps-10-billion-120-veggie-caps-5-billion-per-capsule/7006"
     },
     {"category":"카페인",
     "name":"더블우드 테아크린 100mg 캡슐",
     "link":"https://www.coupang.com/vp/products/1221155033?itemId=2212003672&vendorItemId=70209793289&src=1139000&spec=10799999&addtag=400&ctag=1221155033&lptag=AF7910856&itime=20231219020532&pageType=PRODUCT&pageValue=1221155033&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020532&redirect=landing&traceid=V0-181-1161d76a4f328d36&mcid=30b15df10812402793f41c0453874494&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"크레아틴",
     "name":"크레아퓨어® 크레아틴",
     "link":"https://www.myprotein.co.kr/sports-nutrition/creapure-creatine-powder/10529740.html?affil=awin&utm_content=https%3A%2F%2Fblog.naver.com%2Fhyun_do&utm_term=Direct+Traffic&utm_source=AWin-504921&utm_medium=affiliate&utm_campaign=AffiliateWin&sv1=affiliate&sv_campaign_id=504921&awc=10751_1702919169_e17390499025fee746c9cadbc9dfe6a4"
     },
     {"category":"크레아틴",
     "name":"크레아틴 now food",
     "link":"https://www.coupang.com/vp/products/65092914?itemId=219966955&vendorItemId=3531348859&src=1139000&spec=10799999&addtag=400&ctag=65092914&lptag=AF7910856&itime=20231219020632&pageType=PRODUCT&pageValue=65092914&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020632&redirect=landing&traceid=V0-181-d98d37a352dc2b27&mcid=d316d4cc0f77480bb24a326214d441c9&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"베타알라닌",
     "name":"now food베타알라닌",
     "link":"https://kr.iherb.com/pr/now-foods-sports-beta-alanine-pure-powder-17-6-oz-500-g/10940"
     },
     {"category":"Nitrate",
     "name":"Pump Mode 무맛",
     "link":"https://kr.iherb.com/pr/evlution-nutrition-pumpmode-non-stimulant-pump-accelerator-unflavored-4-44-oz-126-g/77320"
     },
     {"category":"Nitrate",
     "name":"Pump Mode 포도맛",
     "link":"https://kr.iherb.com/pr/evlution-nutrition-pumpmode-non-stimulant-pump-accelerator-furious-grape-6-14-oz-174-g/84670"
     },
     {"category":"Sodium Bicarbonate",
     "name":"식소다",
     "link":"https://www.coupang.com/vp/products/101204658?itemId=308663781&vendorItemId=3760493721&src=1139000&spec=10799999&addtag=400&ctag=101204658&lptag=AF7910856&itime=20231219020958&pageType=PRODUCT&pageValue=101204658&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219020958&redirect=landing&traceid=V0-181-e359d2cc6ce43267&mcid=6c14f36614a6490b86bdf19f33f0c3e8&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"스포츠 드링크",
     "name":"게토레이",
     "link":"https://www.coupang.com/vp/products/1650278?itemId=10099465&vendorItemId=3017121689&src=1139000&spec=10799999&addtag=400&ctag=1650278&lptag=AF7910856&itime=20231219021020&pageType=PRODUCT&pageValue=1650278&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219021020&redirect=landing&traceid=V0-181-146e6bf32c3f5ab0&mcid=6ddc640080f54a7d9f40447da0b595de&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"스포츠 드링크",
     "name":"파워에이드",
     "link":"https://www.coupang.com/vp/products/1650248?itemId=5795123&vendorItemId=4043017735&src=1139000&spec=10799999&addtag=400&ctag=1650248&lptag=AF7910856&itime=20231219021045&pageType=PRODUCT&pageValue=1650248&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219021045&redirect=landing&traceid=V0-181-bce033d202011ec7&mcid=dc0f0fad8dbc498793d94ee09a24492b&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },

     {"category":"BCAA",
     "name":"BCAA 무맛,식물성",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-bcaa-powder-ajipure-branched-chain-amino-acids-16-oz-454-g/71025"
     },
     {"category":"BCAA",
     "name":"BCAA 레몬맛",
     "link":"https://www.coupang.com/vp/products/514488?itemId=1533213&vendorItemId=3212344468&src=1139000&spec=10799999&addtag=400&ctag=514488&lptag=AF7910856&itime=20231219021137&pageType=PRODUCT&pageValue=514488&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219021137&redirect=landing&traceid=V0-181-64a4f434be73b979&mcid=428f803f97cb49759df02980ed2d8781&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"시트룰린,아르기닌",
     "name":"김종국 아르기닌",
     "link":"https://brand.naver.com/exxxtreme/products/8867208942?n_media=27758&n_query=%EC%95%84%EB%A5%B4%EA%B8%B0%EB%8B%8C&n_rank=2&n_ad_group=grp-a001-02-000000036302560&n_ad=nad-a001-02-000000255780471&n_campaign_type=2&n_mall_id=ncp_1o0i66_01&n_mall_pid=8867208942&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlqb6cf8g%7Cci%3D0yW0002itm1zeEjaVL0j%7Ctr%3Dpla%7Chk%3D76254f0dad11b5cb4c5fc54cffdfb946a8b7cd08"
     },
     {"category":"시트룰린,아르기닌",
     "name":"아르기닌 작은 알약",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-l-arginine-60-veggie-capsules/72313"
     },
     {"category":"비타민D",
     "name":"비건 비타민 D3,K2",
     "link":"https://kr.iherb.com/pr/mrm-nutrition-vegan-vitamin-d3-k2-60-vegan-capsules/77415"
     },
     {"category":"비타민D",
     "name":"식물성 비타민 D3,K2",
     "link":"https://kr.iherb.com/pr/sports-research-d3-k2-plant-based-60-veggie-softgels/79975"
     },
     {"category":"칼슘",
     "name":"Solgar, 구연산 칼슘, 비타민D3",
     "link":"https://kr.iherb.com/pr/solgar-calcium-citrate-with-vitamin-d3-240-tablets/12146"
     },
     {"category":"칼슘",
     "name":"블루보넷 칼슘",
     "link":"https://www.coupang.com/vp/products/1204981?itemId=5218303&vendorItemId=3253274343&src=1139000&spec=10799999&addtag=400&ctag=1204981&lptag=AF7910856&itime=20231219021642&pageType=PRODUCT&pageValue=1204981&wPcid=49409515423255809030996&wRef=wintersleeping.com&wTime=20231219021642&redirect=landing&traceid=V0-181-9501ca2d5c0ccf14&mcid=40c5f42975af4f53b01b735c1cd4a631&placementid=&clickBeacon=&campaignid=&contentcategory=&imgsize=&tsource=&pageid=&deviceid=&token=&contenttype=&subid=&impressionid=&campaigntype=&requestid=&contentkeyword=&subparam=&isAddedCart="
     },
     {"category":"오메가3",
     "name":"오메가3, 800mg, TG",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-omega-800-pharmaceutical-grade-fish-oil-80-epa-dha-triglyceride-form-1-000-mg-30-fish-gelatin-softgels/82845"
     },
     {"category":"오메가3",
     "name":"오메가3 피쉬 오일",
     "link":"https://kr.iherb.com/pr/sports-research-omega-3-fish-oil-triple-strength-180-softgels/113871"
     },
     {"category":"아연",
     "name":"NOW Foods, 징크피콜리네이트, 50mg",
     "link":"https://kr.iherb.com/pr/now-foods-zinc-picolinate-50-mg-120-veg-capsules/878"
     },
     {"category":"마그네슘",
     "name":"마그네슘 킬레이드 알약",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-magnesium-bisglycinate-formulated-with-traacs-200-mg-240-veggie-capsules-100-mg-per-capsule/103274"
     },
     {"category":"밀크시슬",
     "name":"간 건강 지원 포뮬라, 베지 캡슐 100정",
     "link":"https://kr.iherb.com/pr/nature-s-way-thisilyn-liver-support-formula-100-vegan-capsules/4545"
     },
     {"category":"밀크시슬",
     "name":"유기농 밀크씨슬 실리마린",
     "link":"https://brand.naver.com/nutricore/products/2019954468?n_media=27758&n_query=%EB%B0%80%ED%81%AC%EC%8B%9C%EC%8A%AC&n_rank=1&n_ad_group=grp-a001-02-000000037601214&n_ad=nad-a001-02-000000265755628&n_campaign_type=2&n_mall_id=nutricore&n_mall_pid=2019954468&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlqb6mv08%7Cci%3D0Ay0001VtS1zxAw9%5FLpq%7Ctr%3Dpla%7Chk%3D181962f51e8d00daa48f07b9d19b7268036573b3"
     },
     {"category":"홍경천(피로회복)",
     "name":"홍경천 베지 캡슐 60정",
     "link":"https://kr.iherb.com/pr/now-foods-rhodiola-500-mg-60-veg-capsules/335?refid=db32f0bf-357b-4082-8e27-a193fef5815f"
     },
     {"category":"테아닌",
     "name":"캘리포니아 골드 테아닌",
     "link":"https://kr.iherb.com/pr/california-gold-nutrition-l-theanine-featuring-alphawave-200-mg-60-veggie-capsules/83280"
     },

]

video_link = [
    {"category":"필수 영양학",
        "thumb_link": "https://img.youtube.com/vi/RuETbsl5IUU/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=RuETbsl5IUU"
    },
    {"category":"필수 영양학",
        "thumb_link": "https://img.youtube.com/vi/HwRpHQGZyDI/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=HwRpHQGZyDI"
    },
    {"category":"필수 영양학",
        "thumb_link": "https://img.youtube.com/vi/oETSjrbflg0/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=oETSjrbflg0"
    },
    {"category":"필수 영양학",
        "thumb_link": "https://img.youtube.com/vi/DN465XOtDWw/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=DN465XOtDWw"
    },
    {"category":"보충제 관련",
        "thumb_link": "https://img.youtube.com/vi/TDw8xLgpbvg/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=TDw8xLgpbvg"
    },
    {"category":"보충제 관련",
        "thumb_link": "https://img.youtube.com/vi/mDXAkP_BJV4/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=mDXAkP_BJV4"
    },
    {"category":"보충제 관련",
        "thumb_link": "https://img.youtube.com/vi/0e_Ps8UWYo4/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=0e_Ps8UWYo4"
    },
    {"category":"보충제 관련",
        "thumb_link": "https://img.youtube.com/vi/k8KUr8LzaaA/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=k8KUr8LzaaA"
    },
    {"category":"다이어트",
        "thumb_link": "https://img.youtube.com/vi/dTOoUstzsPk/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=dTOoUstzsPk"
    },
    {"category":"다이어트",
        "thumb_link": "https://img.youtube.com/vi/LdB80XWi6UE/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=LdB80XWi6UE"
    },
    {"category":"다이어트",
        "thumb_link": "https://img.youtube.com/vi/QG9f1Lf26J4/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=QG9f1Lf26J4"
    },
    {"category":"다이어트",
        "thumb_link": "https://img.youtube.com/vi/-V8oocupi1c/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=-V8oocupi1c"
    },
    {"category":"운동영양",
        "thumb_link": "https://img.youtube.com/vi/ebxlEx3rsVQ/0.jpg",
        "source_link": "https://www.youtube.com/watch?v=ebxlEx3rsVQ"
    }
]

load_dotenv()

DB_SERVER = os.getenv("DB_SERVER")
DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")
DB_NAME = os.getenv("DB_NAME")
API_KEY = os.getenv("API_KEY")

print(DB_NAME)




# MSSQL 접속
conn = pymssql.connect(host=DB_SERVER,   user=DB_USER,
    password=DB_PW,database=DB_NAME, charset='utf8')
 
# Connection 으로부터 Cursor 생성
cursor = conn.cursor()
 
 
# SQL문 실행
for store in store_link:
    cursor.execute('''INSERT INTO [dbo].[supplement] (category, name, link)
VALUES
    (%s, %s, %s);''', (store['category'], store['name'], store['link']))
    conn.commit()


for video in video_link:
    cursor.execute('''INSERT INTO [dbo].[health_video] (category, thumb_link, source_link)
VALUES
    (%s, %s, %s);''', (video['category'], video['thumb_link'], video['source_link']))
    conn.commit()


f = open('exercises_data.csv','r', encoding='EUC-KR')
rdr = csv.reader(f)
for line in rdr:
    if line[1] =='단위체중당에너지소비량':
        print('str')
    else:
        cursor.execute('''INSERT INTO [dbo].[exercise] (exerciseName, calories_per_usage)
    VALUES
        (%s, %s);''', (line[0],float(line[1])))
        conn.commit() 
f.close()

f = open('food_data.csv','r', encoding='EUC-KR')
rdr = csv.reader(f)
for line in rdr:
    if line[1] =='식품명':
        print('str')
    else:
        # print(line[1], line[17], line[19], line[20],line[22])
        #이름 칼로리 단 지 탄 
        #이름 탄 단 지 칼
        if(line[22] != ''):
            line[22] = float(line[22])
        if(line[19] != ''):
            line[19] = float(line[19])
        if(line[20] != ''):
            line[20] = float(line[20])
        if(line[17] != ''):
            line[17] = float(line[17])
        cursor.execute('''INSERT INTO [dbo].[food] (food_name, carbohydrates ,protein, fat,calories)
    VALUES
        (%s, %s, %s, %s, %s);''', (line[1],line[22],line[19],line[20],line[17]))
        conn.commit() 
f.close()



# 연결 끊기
conn.close()          