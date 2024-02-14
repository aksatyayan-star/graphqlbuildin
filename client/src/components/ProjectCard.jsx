

export default function ProjectCard( { project }) { //this project passed here is a prop
  return (
    <div className="col-md-6">
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title"> {project.name} </h5>

                    <a className="btn brtn-light" href={`/projects/${project.id}`}> 
                        View {/*Have not yet set react router that's why using a tag in here */}
                    </a>
                </div>
                <p className="small">
                    Status : <strong>{project.status}</strong>
                </p>
            </div>
        </div>

    </div>
  );
}
