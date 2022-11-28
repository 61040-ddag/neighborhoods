import type { HydratedDocument, Types } from 'mongoose';
import type { Neighborhood } from './model';
import NeighborhoodModel from './model';

class NeighborhoodCollection {
  /**
 * Add a new neighborhood
 *
 * @param {string} name - The name of the neighborhood
 * @param {string} city - The city of the neighborhood's location
 * @param {string} state - The state of the neighborhood's location
 * @param {number} latitude - The latitude of the neighborhood's location
 * @param {number} longitude - The longitude of the neighborhood's location
 * @param {number} crimeRate - The crime rate in the neighborhood
 * @param {number} averagePrice - The average price of a home in the neighborhood
 * @param {number} averageAge - The average age of the residents in the neighborhood
 * @return {Promise<HydratedDocument<Neighborhood>>} - The newly created neighborhood
 */
  static async addOne(name: string, city: string, state: string, latitude: number, longitude: number, crimeRate: number, averagePrice: number, averageAge: number): Promise<HydratedDocument<Neighborhood>> {
    const neighborhood = new NeighborhoodModel({ name, city, state, latitude, longitude, crimeRate, averagePrice, averageAge });
    await neighborhood.save(); // Saves user to MongoDB
    return neighborhood;
  }

  /**
   * Find a neighborhood by given name, city, and state
   * 
   * @param {string} name - The name of the neighborhood
   * @param {string} city - The city of the neighborhood's location
   * @param {string} state - The state of the neighborhood's location
   * @returns {Promise<HydratedDocument<Neighborhood>>} - The neighborhood with the given name, city, and state
   */
  static async findOneByInfo(name: string, city: string, state: string): Promise<HydratedDocument<Neighborhood>> {
    return NeighborhoodModel.findOne({ name: name, city: city, state: state });
  }

  /**
   * Find a neighborhood by neighborhoodId
   * 
   * @param {string} neighborhoodId - The id of the neighborhood to find
   * @return {Promise<HydratedDocument<Neighborhood>>} - The neighborhood with the given neighborhoodId, if any
   */
  static async findOneById(neighborhoodId: Types.ObjectId | string): Promise<HydratedDocument<Neighborhood>> {
    return NeighborhoodModel.findOne({ _id: neighborhoodId });
  }

  /**
   * Find all neighborhoods within a given city and state
   * 
   * @param {string} city - The city of the neighborhoods' location
   * @param {string} state - The state of the neighborhoods' location
   * @returns {Promise<HydratedDocument<Neighborhood>[]>} - An array of the neighborhoods in a given city and state
   */
  static async findAllByLocation(city: string, state: string): Promise<Array<HydratedDocument<Neighborhood>>> {
    return NeighborhoodModel.find({ city: city, state: state });
  }

  /**
   * Find all neighborhoods whose latitude and longitude coordinates are within lat1 < lat2 and long1 < long2
   * 
   * @param {number} lat1 - The lower latitude bound
   * @param {number} long1 - The lower longitude bound
   * @param {number} lat2 - The upper latitude bound
   * @param {number} long2 - The upper longitude bound
   * @returns {Promise<HydratedDocument<Neighborhood>[]>} - An array of the neighborhoods within the latitude and longitude bounds
   */
  static async findAllInBound(lat1: number, long1: number, lat2: number, long2: number): Promise<Array<HydratedDocument<Neighborhood>>> {
    const neighborhoods = await NeighborhoodModel.find({});
    return neighborhoods.filter(neighborhood => (lat1 < neighborhood.latitude && neighborhood.latitude < lat2) && (long1 < neighborhood.longitude && neighborhood.longitude < long2));
  }

  /**
   * Update a neighborhood with new information
   *
   * @param {string} name - The name of the neighborhood to be updated
   * @param {string} city - The city of the neighborhood's location to be updated
   * @param {string} state - The state of the neighborhood's location to be updated
   * @param {Object} neighborhoodDetails - An object with the neighborhood's updated information
   * @return {Promise<HydratedDocument<Neighborhood>>} - The updated neighborhood
   */
  static async updateOne(name: string, city: string, state: string, neighborhoodDetails: { crimeRate?: number; averagePrice?: number; averageAge?: number }): Promise<HydratedDocument<Neighborhood>> {
    const neighborhood = await NeighborhoodModel.findOne({ name: name, city: city, state: state });
    if (neighborhoodDetails.crimeRate) {
      neighborhood.crimeRate = neighborhoodDetails.crimeRate;
    }
    if (neighborhoodDetails.averagePrice) {
      neighborhood.averagePrice = neighborhoodDetails.averagePrice;
    }
    if (neighborhoodDetails.averageAge) {
      neighborhood.averageAge = neighborhoodDetails.averageAge;
    }

    await neighborhood.save();
    return neighborhood;
  }

  /**
   * Delete neighborhood with given neighborhoodId
   * 
   * @param {string} neighborhoodId - The id of the neighborhood to delete
   * @returns {Promise<Boolean>} - true if the neighborhood has been deleted, false otherwise
   */
  static async deleteOneById(neighborhoodId: Types.ObjectId | string): Promise<boolean> {
    const neighborhood = await NeighborhoodModel.deleteOne({ _id: neighborhoodId });
    return neighborhood !== null;
  }

  /**
   * Delete neighborhood with given name, city, and state
   * 
   * @param {string} name - The name of the neighborhood
   * @param {string} city - The city of the neighborhood's location
   * @param {string} state - The state of the neighborhood's location
   * @returns {Promise<Boolean>} - true if the neighborhood has been deleted, false otherwise
   */
  static async deleteOneByInfo(name: string, city: string, state: string): Promise<boolean> {
    const neighborhood = await NeighborhoodModel.deleteOne({ name: name, city: city, state: state });
    return neighborhood !== null;
  }
}

export default NeighborhoodCollection;