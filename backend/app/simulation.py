import numpy as np
import pandas as pd

def run_simulation(input_data):
    # Example: simple business simulation
    traffic = input_data["traffic"]
    cpc = input_data["cpc"]
    conversion_rate = input_data["conversion_rate"]
    price = input_data["price"]
    churn = input_data["churn"]

    ad_spend = traffic * cpc
    customers = traffic * conversion_rate
    revenue = customers * price
    mrr = revenue
    cac = ad_spend / customers if customers else 0
    ltv = price / churn if churn else 0

    return {
        "ad_spend": ad_spend,
        "customers": customers,
        "revenue": revenue,
        "mrr": mrr,
        "cac": cac,
        "ltv": ltv,
    }
