export interface StateInfo {
  name: string;
  cities: string[];
}

export const STATES_CITIES: Record<string, StateInfo> = {
  AL: { name: "Alabama", cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"] },
  AK: { name: "Alaska", cities: ["Anchorage", "Juneau", "Fairbanks", "Sitka", "Ketchikan"] },
  AZ: { name: "Arizona", cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Tempe"] },
  AR: { name: "Arkansas", cities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"] },
  CA: { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland", "Long Beach", "Anaheim", "Irvine"] },
  CO: { name: "Colorado", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada"] },
  CT: { name: "Connecticut", cities: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury", "Norwalk"] },
  DE: { name: "Delaware", cities: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"] },
  DC: { name: "District of Columbia", cities: ["Washington"] },
  FL: { name: "Florida", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee", "Fort Lauderdale", "St. Petersburg", "Sarasota", "West Palm Beach"] },
  GA: { name: "Georgia", cities: ["Atlanta", "Savannah", "Augusta", "Columbus", "Macon", "Athens", "Sandy Springs"] },
  HI: { name: "Hawaii", cities: ["Honolulu", "Hilo", "Kailua", "Kapolei", "Lahaina"] },
  ID: { name: "Idaho", cities: ["Boise", "Nampa", "Meridian", "Idaho Falls", "Pocatello"] },
  IL: { name: "Illinois", cities: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield", "Peoria"] },
  IN: { name: "Indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington"] },
  IA: { name: "Iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"] },
  KS: { name: "Kansas", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe", "Lawrence"] },
  KY: { name: "Kentucky", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"] },
  LA: { name: "Louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"] },
  ME: { name: "Maine", cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"] },
  MD: { name: "Maryland", cities: ["Baltimore", "Annapolis", "Rockville", "Gaithersburg", "Frederick", "Bethesda", "Silver Spring"] },
  MA: { name: "Massachusetts", cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Brockton", "Quincy"] },
  MI: { name: "Michigan", cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Ann Arbor", "Flint"] },
  MN: { name: "Minnesota", cities: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park"] },
  MS: { name: "Mississippi", cities: ["Jackson", "Gulfport", "Southaven", "Biloxi", "Hattiesburg"] },
  MO: { name: "Missouri", cities: ["Kansas City", "St. Louis", "Springfield", "Independence", "Columbia"] },
  MT: { name: "Montana", cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"] },
  NE: { name: "Nebraska", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"] },
  NV: { name: "Nevada", cities: ["Las Vegas", "Reno", "Henderson", "North Las Vegas", "Sparks", "Carson City"] },
  NH: { name: "New Hampshire", cities: ["Manchester", "Nashua", "Concord", "Derry", "Dover"] },
  NJ: { name: "New Jersey", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Clifton", "Trenton", "Atlantic City"] },
  NM: { name: "New Mexico", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"] },
  NY: { name: "New York", cities: ["New York", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle"] },
  NC: { name: "North Carolina", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Wilmington"] },
  ND: { name: "North Dakota", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"] },
  OH: { name: "Ohio", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma"] },
  OK: { name: "Oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"] },
  OR: { name: "Oregon", cities: ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro", "Beaverton", "Bend"] },
  PA: { name: "Pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Harrisburg"] },
  RI: { name: "Rhode Island", cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"] },
  SC: { name: "South Carolina", cities: ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill", "Greenville"] },
  SD: { name: "South Dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"] },
  TN: { name: "Tennessee", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro"] },
  TX: { name: "Texas", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock"] },
  UT: { name: "Utah", cities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden"] },
  VT: { name: "Vermont", cities: ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"] },
  VA: { name: "Virginia", cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria", "Hampton"] },
  WA: { name: "Washington", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett"] },
  WV: { name: "West Virginia", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"] },
  WI: { name: "Wisconsin", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha"] },
  WY: { name: "Wyoming", cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"] },
};

/**
 * Dynamically generates a 2-letter uppercase code for any city name.
 * - If multi-word (e.g. "Las Vegas"), takes the first letter of each of the first two words (e.g. "LV").
 * - If single-word (e.g. "Boston"), takes the first two letters of the word (e.g. "BO").
 */
export function getCityCode(city: string): string {
  if (!city) return "";
  const clean = city.trim().replace(/[^a-zA-Z\s]/g, ""); // strip non-alphabetic except spaces
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0][0] || "";
    const second = parts[1][0] || "";
    return (first + second).toUpperCase();
  }
  const word = parts[0] || "";
  return word.slice(0, 2).toUpperCase().padEnd(2, "X");
}

