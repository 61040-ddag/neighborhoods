import type { HydratedDocument, Types } from 'mongoose';
import type { Neighborhood } from './model';
import NeighborhoodModel from './model';

class NeighborhoodCollection {
    /**
   * Add a new neighborhood
   *
   * @param {string} name - The name of the neighborhood
   * @param {string} city - The name of the city
   * @param {string} state - The name of the state
   * @param {number} latitude - The latitude of the neighborhood
   * @param {number} longitude - The longitude of the neighborhood
   * @param {number} crimeRate - The crimeRate of the neighborhood
   * @param {number} averagePrice - The averagePrice of the neighborhood
   * @param {number} averageAge - The averageAge of the neighborhood
   * @return {Promise<HydratedDocument<Nehighborhood>>} - The newly created neighborhood
   */
  static async addOne(name: string, city: string, state: string, latitude: number, longitude: number, crimeRate: number, averagePrice: number, averageAge: number): Promise<HydratedDocument<Neighborhood>> {
    const dateModified = new Date();
    const isAdmin = false;

    const neighborhood = new NeighborhoodModel({ name, city, state, latitude, longitude, crimeRate, averagePrice, averageAge, dateModified});
    await neighborhood.save(); // Saves user to MongoDB
    return neighborhood;
  }
  
  /**
   * Find a neighborhood by name
   * @param name - the name of the neighborhood
   * @param city - the city of the neighborhood
   * @param state - the state of the neighborhood
   * @returns - the neighborhood found
   */
  static async findOneByName(name: string, city: string, state: string) : Promise<HydratedDocument<Neighborhood>>{
    return NeighborhoodModel.findOne({name:name, city:city, state:state});
  }

  /**
   * Find a neighborhood by id
   * 
   * @param nbhoodId - the id of the neighborhood
   * @return - the neighborhood
   */
  static async findOneById(nbhoodId:  Types.ObjectId | string) : Promise<HydratedDocument<Neighborhood>> {
    return NeighborhoodModel.findOne({ _id: nbhoodId });
  }
  
  /**
   * Find all neighborhoods whose latitude and longitude coordinates are between lat1, lat2, long1, long2
   * 
   * @param lat1 - lower latitude bound
   * @param long1 - left longitude bound
   * @param lat2 - upper latitude bound
   * @param long2 - upper longitude bound
   * @returns - the neighborhoods
   */
  static async findAllInBox(lat1: number, long1: number, lat2: number, long2: number) : Promise<Array<HydratedDocument<Neighborhood>>> {
    const neighborhoods = await NeighborhoodModel.find({});
    return neighborhoods.filter(neighborhood => (neighborhood.latitude > lat1 && neighborhood.latitude < lat2) && (neighborhood.longitude > long1 && neighborhood.longitude < long2));
  }

  /**
   * 
   * @param city 
   * @returns 
   */
  static async findAllInCity(city: string) : Promise<Array<HydratedDocument<Neighborhood>>>{
    return NeighborhoodModel.find({city});
  }
  
/**
 * Delete neighborhood with _id nbhoodId
 * 
 * @param nbhoodId - the id of the group to be deleted
 * @returns whether or not the group was deleted
 */
  static async deleteOneById(nbhoodId: Types.ObjectId | string): Promise<boolean>{
    const neighborhood = await NeighborhoodModel.deleteOne({ _id: nbhoodId });
    return neighborhood !== null;
  }

/**
 * Delete neighborhood with name, city
 * 
 * @param name - the name of the neighborhood
 * @param city - the city of the neighborhood
 * @param state - the state of the neighborhood
 * @returns whether or not the group was deleted
 */
   static async deleteOneByName(name: string, city: string, state: string): Promise<boolean>{
    const neighborhood = await NeighborhoodModel.deleteOne({ name: name, city: city, state: state });
    return neighborhood !== null;
  }

  /**
   * Update neighborhood's information
   *
   * @param {string} name - The name  of the neighborhood to update
   * @param {string} city - The city  of the neighborhood to update
   * @param {string} state - The state  of the neighborhood to update
   * @param {Object} userDetails - An object with the neighborhood's updated information
   * @return {Promise<HydratedDocument<Neighborhood>>} - The updated neighborhood
   */
   static async updateOne(name: string, city: string, state: string, neighborhoodDetails: { crimeRate?: number; averagePrice?: number; averageAge?: number }): Promise<HydratedDocument<Neighborhood>> {
    const neighborhood = await NeighborhoodModel.findOne({name:name, city:city, state:state});
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

}

export default NeighborhoodCollection;