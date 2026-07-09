export const categories = [
  { id:"groceries",     emoji:"🛒", label:"Groceries",          max:1500, def:600  },
  { id:"dining",        emoji:"🍽", label:"Dining & takeout",    max:800,  def:250  },
  { id:"gas",           emoji:"⛽", label:"Gas & EV charging",   max:600,  def:150  },
  { id:"travel",        emoji:"✈️", label:"Travel & hotels",     max:1000, def:100  },
  { id:"subscriptions", emoji:"📺", label:"Streaming & subs",    max:200,  def:50   },
  { id:"drugstore",     emoji:"💊", label:"Drugstore & health",  max:300,  def:80   },
  { id:"other",         emoji:"🛍️", label:"Everything else",     max:2000, def:400  },
];

export const cards = [
  { id:"amex_blue_pref",      name:"Blue Cash Preferred",   issuer:"American Express", fee:95,  rates:{groceries:0.06,subscriptions:0.06,gas:0.03},        catchall:0.01, note:"6% groceries & streaming, 3% gas",     url:"#" },
  { id:"chase_sapphire_pref", name:"Sapphire Preferred",    issuer:"Chase",            fee:95,  rates:{dining:0.03,travel:0.03,groceries:0.03,subscriptions:0.03}, catchall:0.01, note:"3× dining, travel & groceries",        url:"#" },
  { id:"citi_double",         name:"Double Cash",           issuer:"Citi",             fee:0,   rates:{},                                                    catchall:0.02, note:"Simple 2% on everything",              url:"#" },
  { id:"amex_blue_ev",        name:"Blue Cash Everyday",    issuer:"American Express", fee:0,   rates:{groceries:0.03,gas:0.02,subscriptions:0.03},          catchall:0.01, note:"3% groceries, no annual fee",           url:"#" },
  { id:"cap_one_savor",       name:"Savor Rewards",         issuer:"Capital One",      fee:95,  rates:{dining:0.04,groceries:0.03,subscriptions:0.04,travel:0.05}, catchall:0.01, note:"4% dining & entertainment",            url:"#" },
  { id:"chase_freedom",       name:"Freedom Unlimited",     issuer:"Chase",            fee:0,   rates:{dining:0.03,drugstore:0.03,travel:0.05},              catchall:0.015,note:"1.5% base + 3% dining & drugstore",    url:"#" },
  { id:"bilt",                name:"Bilt Mastercard",       issuer:"Wells Fargo",      fee:0,   rates:{dining:0.03,travel:0.02},                             catchall:0.01, note:"Points on rent + 3× dining",            url:"#" },
];

export const currentRates = {
  none:                {catchall:0},
  chase_freedom:       {dining:0.03,drugstore:0.03,travel:0.05,catchall:0.015},
  citi_double:         {catchall:0.02},
  amex_blue_ev:        {groceries:0.03,gas:0.02,subscriptions:0.03,catchall:0.01},
  discover_it:         {catchall:0.01},
  cap_one_quicksilver: {catchall:0.015},
};
