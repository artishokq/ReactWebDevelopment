import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

interface Weather {
  temp: number;
  description: string;
  city: string;
}

function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "6e1520773b2f48ca9bf170255251111";

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Moscow`)
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temp_c),
          description: data.current.condition.text,
          city: data.location.name,
        });
        setLoading(false);
      })
      .catch(() => {
        setWeather({
          temp: 20,
          description: "Clear sky",
          city: "Moscow",
        });
        setLoading(false);
      });
  }, []);

  return (
    <Card id="weather" sx={{ maxWidth: 400, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Виджет погоды
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          weather && (
            <Box textAlign="center" py={2}>
              <WbSunnyIcon sx={{ fontSize: 60, color: "#FDB813" }} />
              <Typography variant="h3" component="div" sx={{ my: 2 }}>
                {weather.temp}°C
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {weather.city}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {weather.description}
              </Typography>
            </Box>
          )
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherWidget;
