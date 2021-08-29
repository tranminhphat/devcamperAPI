import Bootcamp from '../models/Bootcamp';
import { BootcampInput } from '../types/bootcamp';
import queryBuilder from '../utils/QueryBuilder';

export const createBootcamp = async (input: BootcampInput) => {
	return await Bootcamp.create(input);
};

export const fetchBootcamps = async (queryRequest: any) => {
	const query = Bootcamp.find();
	const q = queryBuilder(query, queryRequest);
	return await q;
};

export const fetchBootcampById = async (bootcampId: string) => {
	return await Bootcamp.findById(bootcampId);
};

export const updateBootcampById = async (
	bootcampId: string,
	updateProperties: Partial<BootcampInput>
) => {
	return await Bootcamp.findByIdAndUpdate(bootcampId, updateProperties, {
		new: true,
		runValidators: true,
	});
};

export const deleteBootcampById = async (bootcampId: string) => {
	return await Bootcamp.findByIdAndDelete(bootcampId);
};

export const fetchBootcampsByRadius = async (
	lat: number,
	lng: number,
	radius: number
) => {
	// https://docs.mongodb.com/manual/reference/operator/query/centerSphere/
	return await Bootcamp.find({
		location: {
			$geoWithin: { $centerSphere: [[lng, lat], radius] },
		},
	});
};
