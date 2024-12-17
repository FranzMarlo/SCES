        decline_count = 0
        stable_count = 0

        for i in range(1, len(gwa_values)):
            gwa_from = int(gwa_values[i - 1])
            gwa_to = int(gwa_values[i])
            diff = gwa_to - gwa_from

            if diff > 0:
                improvement_count += 1
                insights.append(
                    f"Improvement in GWA from {gwa_from} to {gwa_to} between {grade_levels[i - 1]} and {grade_levels[i]}."
                )
            elif diff < 0:
                decline_count += 1
                insights.append(
                    f"Decline in GWA from {gwa_from} to {gwa_to} between {grade_levels[i - 1]} and {grade_levels[i]}."
                )
            else:
                stable_count += 1
                insights.append(
                    f"No changes in GWA between {grade_levels[i - 1]} and {grade_levels[i]}."
                )

        # Determine the overall trend
        if improvement_count > decline_count and improvement_count > stable_count:
            overall_message = "The student's academic performance shows a notable improvement."
            recommendation = get_random_improved_recommendation()
            warning = 1
        elif decline_count > improvement_count:
            overall_message = "The student's academic performance shows a decline, indicating potential areas of difficulty."
            recommendation = get_random_decline_recommendation()
            warning = 0
        else:
            overall_message = "The student's academic performance has remained stable without significant changes."
            recommendation = get_random_stable_recommendation()
            warning = 2

        response = {
            "overall_message": overall_message,
            "insights": insights,
            "warning": warning,
            "recommendation": recommendation,
        }