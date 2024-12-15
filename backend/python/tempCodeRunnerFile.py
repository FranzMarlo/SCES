        trends = []
            overall_trend = 0

            for i in range(1, len(bar_data)):
                diff = bar_data[i] - bar_data[i - 1]
                overall_trend += diff
                grade_from = labels[i - 1]
                grade_to = labels[i]

                if abs(diff) > 0:  # Significant change
                    direction = "Improvement" if diff > 0 else "Decline"
                    trends.append(f"{direction} from {grade_from} (GWA: {bar_data[i-1]}) to {grade_to} (GWA: {bar_data[i]}).")

            if trends:
                overall_message = (
                    "an improvement" if overall_trend > 0
                    else "a decline" if overall_trend < 0
                    else "no significant change"
                )
                return {
                    "introduction": f"Based on the chart above, the {grade} had significant changes such as:",
                    "trends": trends,
                    "conclusion": f"Overall, there is {overall_message} in performance.",
                    "recommendation": "Investigate the causes of changes and maintain strategies to ensure consistent improvement."
                }
            else:
                return {
                    "introduction": f"Based on the chart above, no significant changes were observed for {grade}.",
                    "trends": [],
                    "conclusion": "Overall, performance remained consistent with no major fluctuations.",
                    "recommendation": "Continue monitoring performance trends while maintaining current strategies."
                }