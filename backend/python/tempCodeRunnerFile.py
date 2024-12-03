def format_quarter_label(quarter_number):
    quarters = {1: "1st Quarter", 2: "2nd Quarter", 3: "3rd Quarter", 4: "4th Quarter"}
    return quarters.get(quarter_number, f"Quarter {quarter_number}")