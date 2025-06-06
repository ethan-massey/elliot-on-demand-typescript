import { Service } from "typedi";
import axios from "axios";
import { SpotifySegment } from "../model/ElliotDailySpotifyUpload.Entity";
import "dotenv/config";

interface segmentByDate {
  date: string;
  segment: SpotifySegment;
}
@Service()
export class SpotifyRetrievalService {
  // Get all Elliot in the Morning episodes from Spotify
  public async getSegmentsByDateFromSpotify(): Promise<segmentByDate[]> {
    const spotify_bearer_token = await this.getSpotifyBearerToken();

    let config = {
      method: "get",
      // limit=50 maximum that Spotify will provide
      url: "https://api.spotify.com/v1/shows/4guKQiUnhhWoBGg7KGz9Nb/episodes?market=US&limit=50",
      headers: {
        Authorization: `Bearer ${spotify_bearer_token}`,
      },
    };

    try {
      const response = await axios(config);
      return this.formatSpotifyDataIntoSegmentsByDate(response.data.items);
    } catch (error) {
      console.error(`Error fetching episodes from Spotify. ${error}`);
      throw new Error(`Error fetching episodes from Spotify. ${error}`);
    }
  }

  private formatSpotifyDataIntoSegmentsByDate(
    spotifyResponseData: any[],
  ): segmentByDate[] {
    let segmentsByDate: segmentByDate[] = [];
    // get relevant data (date, title, description)
    spotifyResponseData.forEach((element: any) => {
      if (element !== null) {
        segmentsByDate.push({
          date: element.release_date,
          segment: {
            title: element.name,
            description: element.description,
          },
        });
      } else {
        // because Spotify sometimes returns null elements in the response (?)
        console.warn("Encountered null element in Spotify response data.");
      }
    });
    return segmentsByDate;
  }

  // Get bearer token from Spotify. Expires after 1 hour
  private async getSpotifyBearerToken(): Promise<string> {
    let data = {
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    };
    let config = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };

    try {
      const response = await axios(config);
      return response.data.access_token;
    } catch (error) {
      console.error(`Error fetching Spotify bearer token. ${error}`);
      throw new Error(`Error fetching Spotify bearer token. ${error}`);
    }
  }
}
