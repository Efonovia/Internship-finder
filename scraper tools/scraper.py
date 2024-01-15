import requests
from bs4 import BeautifulSoup

def to_text_list(tags):
    text_list = []
    try:
        for tag in tags:
            text_list.append(tag.text)

        return text_list
    except Exception as e:
        print(f"Error in to_text_list: {e}")
        return "null"

all_data = []

thousand_counter = 0
for current_id in range(77, 177):
    try:
        data = requests.get(f"https://www.finelib.com/listing/National-Insurance-Commission/{current_id}/")
        print(data.status_code)
        data.raise_for_status()
        if data.status_code == 200:
            soup = BeautifulSoup(data.text, "lxml")
            try:
                tag_elements = soup.find("div", class_="breadcrumb")
                temp_company_tags = to_text_list(tag_elements.find_all("a"))
                temp_company_tags.pop(0)
                company_tags = temp_company_tags or "null"
            except:
                company_tags = "null"

            try:
                company_name = soup.find("span", itemprop="name").text or "null"
            except:
                company_name = "null"

            try:
                company_logo = soup.find("img", class_="review-img-border-2 company_logo_tn").attrs["src"] or "null"
            except:
                company_logo = "null"

            try:
                company_street_address = soup.find("span", itemprop="streetAddress").text or "null"
            except: 
                company_street_address = "null"

            try:
                company_city = soup.find("span", itemprop="addressLocality").text or "null"
            except: 
                company_city = "null"

            try:
                company_state = soup.find("span", itemprop="addressRegion").text.split(", ")[0] or "null"
            except: 
                company_state = "null"

            try:
                telephone = soup.find("span", itemprop="telephone")
                company_phone_numbers = to_text_list(telephone.find_all("a")) or "null"
            except: 
                company_phone_numbers = "null"

            try:
                listing_url = soup.find("div", class_="cmpny-lstng url")
                company_website = listing_url.find("a").text or "null"
            except: 
                company_website = "null"

            try:
                email_header = soup.find("h3", text="E-mail Contact")
                company_email = email_header.find_next("p").a.text or "null"
            except: 
                company_email = "null"

            try:
                company_description = soup.find("span", itemprop="description").text or "null"
            except: 
                company_description = "null"

            try:
                working_hours_header = soup.find("h3", text="Working Hours")
                company_working_hours = working_hours_header.find_next("p").text or "null"
            except: 
                company_working_hours = "null"

            try:
                company_reviews = []
                id=0
                reviews = soup.find_all("div", itemprop="review")
                for review in reviews:
                    company_review = {
                        "id": id,
                        "author": review.find("span", itemprop="author").text.split(" ")[0] or "null",
                        "review_content": review.find("p", itemprop="description").text or "null",
                        "rating": review.find("meta", itemprop="ratingValue").attrs['content'] or "null",
                        "date_published": review.find("meta", itemprop="datePublished").attrs['content'] or "null"
                    }
                    company_reviews.append(company_review)
                    id+=1
            except: 
                company_reviews = []

            company_details = {
                "id": current_id,
                "name": company_name,
                "tags": company_tags,
                "logo": company_logo,
                "street": company_street_address,
                "city": company_city,
                "state": company_state,
                "phone_numbers": company_phone_numbers,
                "website": company_website,
                "email": company_email,
                "description": company_description,
                "working_hours": company_working_hours,
                "reviews": company_reviews
            }

            all_data.append(company_details)
            thousand_counter += 1
            print(company_details)
            if thousand_counter >= 1000:
                with open("data.txt", "a") as f:
                    f.write(str(all_data) + "\n ----------------------- \n")
                thousand_counter = 0
                all_data = []

        else: 
            print("URL DOES NOT EXIST")

    except requests.exceptions.RequestException as e:
        print(f"Error in request for {current_id}: {e}")
    except Exception as e:
        print(f"Error processing {current_id}: {e}")

with open("data.txt", "a") as f:
    f.write(str(all_data) + "\n ----------------------- \n")