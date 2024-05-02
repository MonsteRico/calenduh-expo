import { DayBeingViewedContext } from "@/hooks/contexts";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { DateTime } from "luxon";
import { useToday } from "@/hooks/useToday";
import { cn } from "@/lib/utils";
import { useSession } from "@/components/ctx";
import { useUser } from "@/components/user-context";
import { router } from "expo-router";
export default function MonthScreen() {
    const today = useToday();
    const user = useUser();
    const { value: dayBeingViewed, setValue: setDayBeingViewed } = useContext(
        DayBeingViewedContext
    );

    const daysBeforeFirst = dayBeingViewed.set({ day: 1 }).weekday;
    const daysAfterLast =
        13 - dayBeingViewed.set({ day: dayBeingViewed.daysInMonth }).weekday;
    const daysInPreviousMonth = dayBeingViewed.minus({ month: 1 }).daysInMonth;
    const daysInNextMonth = dayBeingViewed.plus({ month: 1 }).daysInMonth;

    // make an array of all the days shown in the current view
    const days = Array.from({ length: daysInPreviousMonth }, (_, i) =>
        dayBeingViewed
            .minus({ month: 1 })
            .startOf("day")
            .set({ day: i + 1 })
    )
        .slice(-daysBeforeFirst)
        .concat(
            Array.from({ length: dayBeingViewed.daysInMonth }, (_, i) =>
                dayBeingViewed.startOf("day").set({ day: i + 1 })
            )
        )
        .concat(
            Array.from({ length: daysInNextMonth }, (_, i) =>
                dayBeingViewed
                    .plus({ month: 1 })
                    .startOf("day")
                    .set({ day: i + 1 })
            ).slice(0, daysAfterLast)
        )
        .slice(0, 42) as DateTime<true>[];

    return (
        <View className="flex flex-col bg-background min-h-screen items-center">
            <View className="mb-2 flex !flex-row text-center text-xl">
                <Text className="text-primary text-center w-full basis-1/7">
                    Sun
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Mon
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Tue
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Wed
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Thu
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Fri
                </Text>
                <Text className="text-primary text-center w-full basis-1/7">
                    Sat
                </Text>
            </View>
            <View className="flex flex-wrap !flex-row justify-center">
                {days.map((day, i) => {
                    return (
                        <Day
                            key={i}
                            day={day}
                            bottomRow={Math.floor(i / 7) == 5}
                        />
                    );
                })}
            </View>
            <View className="flex flex-col w-full">
                <Text className="text-primary mt-4 font-bold text-3xl">
                    Hello {user.name}, today is{" "}
                    {today.toLocaleString(DateTime.DATE_FULL)}
                </Text>
                <Text className="text-primary mt-4 font-bold text-2xl">
                    Upcoming Events
                </Text>
                <View className="flex flex-col w-full">
                    <Text className="text-primary text-2xl">Event 1</Text>
                    <Text className="text-primary text-2xl">Event 2</Text>

                    <Text className="text-primary text-2xl">Event 3</Text>
                    <Text className="text-primary text-2xl">Event 4</Text>
                </View>
            </View>
        </View>
    );
}

function Day({
    day,
    bottomRow = false,
}: {
    day: DateTime<true>;
    bottomRow?: boolean;
}) {
    const today = useToday();
    const dayNumber = day.day;
    const { value: dayBeingViewed } = useContext(DayBeingViewedContext);
    const currentMonth = dayBeingViewed.month == day.month;
    const dayIsSaturday = day.weekday === 6;
    const isToday = day.hasSame(today, "day");

    return (
        <Pressable
            className={cn(
                "flex justify-center basis-1/7 items-center w-full h-16 relative border-l-4 border-t-4 border-primary-foreground text-2xl",
                dayIsSaturday && "border-r-4",
                bottomRow && "border-b-4"
            )}
            onPress={() => {
                console.log("Day pressed", day.toISODate());
                router.navigate("/day");
            }}
        >
            <Text
                className={cn(
                    "text-lg absolute left-2 top-2",
                    currentMonth
                        ? "text-primary font-bold"
                        : "text-muted-foreground",
                    isToday && "text-calendarAccent"
                )}
            >
                {dayNumber}
            </Text>
        </Pressable>
    );
}
