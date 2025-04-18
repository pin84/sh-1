def get_split_partner_supply_fleet_name():
    return  {
        2588:"hoppaSupply",
        2:"bookingSupply",
        28:"klookSupply",
        4:"jayrideSupply",
        5:"CityAirportTaxisSupply",
        2692:"emergingTravelGroup",
        2621:"china_CtripAPI",
        2679:"cost_at_elife",
        2683:"cost_at_elife",
        4001:"hoppaSupply",
        4004:"hoppaSupply",
        4005:"hoppaSupply",
        8001:"hoppaSupply",
        8002:"hoppaSupply",
        8003:"hoppaSupply",
        8005:"hoppaSupply",
        8006:"hoppaSupply",
        8007:"hoppaSupply",
    }



for i in get_split_partner_supply_fleet_name():
    kyes = list(get_split_partner_supply_fleet_name().keys())
    print(kyes)
print("=========================================")