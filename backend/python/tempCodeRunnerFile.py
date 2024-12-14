        overall_message = (
                "Overall, the student's academic performance shows a notable improvement. "
                "This progress reflects commendable effort and dedication. Instructors recommend that the student continue employing effective study strategies, "
                "participate actively in class discussions, and seek out advanced materials or challenges to sustain this upward trajectory. "
                "Setting specific academic goals with instructor guidance can further solidify this progress."
            )
        elif overall_trend < 0:
            overall_message = (
                "Overall, the student's academic performance has declined, indicating potential areas of difficulty. "
                "Instructors recommend focused interventions, including regular consultations with teachers, targeted review sessions on weaker subjects, "
                "and increased participation in supplemental activities like tutoring or group studies. "
                "Addressing this decline promptly with guidance from instructors can help the student regain momentum and improve overall performance."
            )
        else:
            overall_message = (
                "Overall, the student's academic performance has remained stable without significant changes. "
                "While maintaining consistency is commendable, instructors encourage the student to aim for growth by taking on more challenging tasks, "
                "engaging in extracurricular academic opportunities, and actively seeking feedback from teachers. "
                "Collaborating with instructors to set higher academic goals and identifying areas for improvement can help the student unlock their full potential."
            )